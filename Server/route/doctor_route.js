const router = require('express').Router()
const Doctor = require('../model/doctor')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const {doctorAuth} = require('../middleware.js/auth');
const Appointment = require('../model/appointment');
const patient = require('../model/patient');


//register
router.post('/',async(req,res)=>{
  const useremail = req.body.email
  const exitingUser = await Doctor.findOne({email:useremail})
  if(exitingUser === null){
    const saltPassword = await bcrypt.genSalt(10);
		const securePassword = await bcrypt.hash(req.body.password, saltPassword);
        const doctor = new Doctor({
          username:req.body.username,
          email:req.body.email,
          password:securePassword
        })

        try{
            const save = await doctor.save()
            res.json({message:"Data Saved Sucessfully",data:save})
            console.log("Doctor's Data Saved Sucessfully")
        }catch(err){
            console.log(`${err}`)
            res.json({message:err})
        }
  }else{
    res.json({message:`User Email Exist! Please Try another one.`,auth:false})
  }
})
router.post('/login',async(req,res)=>{
  const email = req.body.email
  const doctor = await Doctor.findOne({email:email})
  if(doctor !== null){
        if(await bcrypt.compare(req.body.password, doctor.password)){
          const user_id = doctor._id
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

router.get('/all_doctor',async(req,res)=>{
  const doctor = await Doctor.find()
  res.json({data:doctor})
})

router.delete('/delete/:id',async(req,res)=>{
  const id = req.params['id']
  try{
      const deleteDoctor = await Doctor.deleteOne({ _id:id })
      res.json({data:deleteDoctor,message:"Deleted Doctor"})
  }
  catch(err){
      res.json(`Error : ${err}`)
  }
})


router.post('/update',doctorAuth,async(req,res)=>{
  const doctor_id = req.user._id
  const doc_contact = req.body.contact_details
  const doc_experience = req.body.experience
  const doc_clinic = req.body.clinic_info
  const doc_service = req.body.service
  const doc_specialization = req.body.specialization
  const details = req.body.details
  const medical_registration = req.body.medical_registration
  const education = req.body.education


  try{
    const updateRecord = await Doctor.updateOne({_id:doctor_id},
      {$set:
        {
          details:details,
          contact_details:doc_contact,
          clinic_info:doc_clinic,
          medical_reg:medical_registration,
          education:education,
          experince:doc_experience,
          service:doc_service,
          specialization:doc_specialization
        }})

      res.json({data:updateRecord,message:"Data Updated Successfully"})
  }catch(err){
    res.status(400).json({message:`Error : ${err}`})
    console.log(`Error Occured : ${err}`)
  }
})
router.get('/getDoctor',doctorAuth,async(req,res)=>{
  const user = req.user
  res.json({user:user})
})
router.get('/getDoctor/:id',async(req,res)=>{
  const id = req.params['id']
  try{
    const getDoc = await Doctor.findOne({_id:id})
   // console.log("calling from doc")
    res.json({data:getDoc})
  }catch(err){
    console.log(`Error Occured ${err}`)
    res.json({message:`Error Occured ${err}`})
  }
})

router.get('/getPatients/:doctor_id',async(req,res)=>{
  const id = req.params['doctor_id']
  const allApointments = await Appointment.find({d_id:id})
  const allPatients = await patient.find()
  const array = []
  allApointments.map((ele)=>{
    if(!array.includes(ele.p_id)){
      array.push(ele.p_id)
    }
  })
  
  res.json({patients:allPatients,id:array})
})

router.post('/CheckPassword',doctorAuth,async(req,res)=>{
  const user = req.user.password
  const pass = req.body.pass
  
  if(await bcrypt.compare(pass, user)){

    res.json({message:"Correct Password",auth:true})
 }else{
   res.json({message:"Incorrect Password",auth:false})
 }
})
router.post('/ChangePassword',doctorAuth,async(req,res)=>{
  const user = req.user._id
  const newPassword = req.body.new_pass
  console.log(`${user}`,newPassword)
  const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(newPassword, saltPassword);
  const update = await Doctor.findByIdAndUpdate({_id:`${user}`},{$set:{password:securePassword}})
  //console.log(update)
  res.json({message:"Password Updated!"})
})

router.post('/updateStatus',async(req,res)=>{
  const id = req.body.user_id
  try{
    const doctor = await Doctor.findByIdAndUpdate({_id:id},{$set:{verified:true}})
  res.json({message:`Status Updated`})
  }catch(err){
    res.json(`error occured: ${err}`)
  }
})
module.exports = router