const router = require('express').Router()
const Appoinments = require('../model/appointment')
const Patients = require('../model/patient')
const Doctors = require('../model/doctor')
const { adminAuth } = require('../middleware.js/auth')
const Admin = require('../model/admin')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

router.post('/login',async(req,res)=>{
    const email = req.body.email
    
    const admin = await Admin.findOne({email:email})
    
    if(admin !== null){
          if(await bcrypt.compare(req.body.password, admin.password)){
            const user_id = admin._id
            const token = jwt.sign({user_id},"DoccureSecretKey")
            res.json({message:"User Found",id:user_id,auth:true,token:token})
        }
        else{
            res.json({message:"Wrong Password",auth:false})
        }
    }
    else{
         res.json({message:`user not exist : `,auth:false})
     }
})
router.post('/signup',async(req,res)=>{
    const useremail = req.body.email
  const exitingUser = await Admin.findOne({email:useremail})
  if(exitingUser === null){
    const saltPassword = await bcrypt.genSalt(10);
		const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const admin = new Admin({
      username:req.body.username,
      email:req.body.email,
      password:securePassword
    })
  
    try{
        const save = await admin.save()
        res.json({message:"Data Saved Sucessfully",data:save})
        console.log("Saved Sucessfully")
    }catch(err){
        console.log(`${err}`)
        res.json({message:err})
    }
  }else{
    res.json({message:`Patients exist on this email. Please try another one.`,auth:false})
  }
  
})

router.get('/',adminAuth,async(req,res)=>{
    const patient = await Patients.find()
    const doctor = await Doctors.find()
    const appointment = await Appoinments.find()

    const d = []
    doctor.map((ele)=>{
		const body = {}
        if(ele.details !== undefined){
        
        var earned = 0
        const fees = ele.details.fees
        var fee = 0
        if(fees.includes('$')){
            fee = parseInt(fees.split('$')[1])*70
        }
        else{
            fee = parseInt(fees.split('.')[1])
        }
        
        
        appointment.map((e)=>{
            
            if(ele._id == e.d_id){
                earned = earned + fee
            }
        })
        body._id = ele._id
        body.image = ele.details.imageUrl
        body.name = `${ele.details.fname} ${ele.details.lname}`
        body.speciality = ele.specialization.join()
        body.earned = earned
        body.verified = ele.verified
        body.email = ele.details.email

        d.push(body)
    }else{
        body._id = ele._id
        body.image = ""
        body.name = ele.username
        body.speciality = []
        body.earned = 0
        body.verified = ele.verified
        body.email = ele.email

        d.push(body)

    }
    })
    p = []
    patient.map((ele)=>{
        const body = {}
        var paid = 0
        if(ele.details !== undefined){
        appointment.map((e)=>{
            if(ele._id == e.p_id)
            {
                var amount = e.amount
                if(amount.includes('$')){
                    a = parseInt(amount.split('$')[1])
                    paid = paid + a*70
                
                }else{
                    amount = parseInt(amount.split('.')[1])
                    paid = paid + amount

                }

                
                
            }    
        })
        var date = new Date(Date.now()).getFullYear()
        console.log(ele.details)
        var age = date - parseInt(ele.details.dob.split('/')[2])
        body._id = ele._id
        body.image = ele.details.imageUrl
        body.name = `${ele.details.fname} ${ele.details.lname}`
        body.paid = paid
        body.contact = ele.details.contact
        body.email = ele.email
        body.address = ele.details.address
        body.age = age

        p.push(body)   
    }
    else{
        body._id = ele._id
        body.image = null
        body.name = ele.username
        body.paid = 0
        body.contact = null
        body.email = ele.email
        body.address = null
        body.age = null

        p.push(body)   

    }
    })
   
    
    res.json(
        {
            doctor_count:doctor.length,
            patient_count:patient.length,
            appointment_count:appointment.length,
            doctor:d,
            patient:p,
            appointment:appointment
        }
    )
})


module.exports = router