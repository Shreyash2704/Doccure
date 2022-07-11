const router = require('express').Router()
const Patients = require('../model/patient')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const {patientAuth} = require('../middleware.js/auth');
const doctor = require('../model/doctor');
const appointment = require('../model/appointment');


//register
router.post('/',async(req,res)=>{
  const useremail = req.body.email
  const exitingUser = await Patients.findOne({email:useremail})
  if(exitingUser === null){
    const saltPassword = await bcrypt.genSalt(10);
		const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const patient = new Patients({
      username:req.body.username,
      email:req.body.email,
      password:securePassword
    })
  
    try{
        const save = await patient.save()
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

//login
router.post('/login',async(req,res)=>{
  const email = req.body.email
  console.log(email)
  const patient = await Patients.findOne({email:email})
  console.log(patient)
  if(patient !== null){
        if(await bcrypt.compare(req.body.password, patient.password)){
          const user_id = patient._id
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

router.get('/all_patients',async(req,res)=>{
  const allPatients = await Patients.find()
  res.json({data:allPatients})
})

router.post('/update', patientAuth , async (req,res) =>{
  const user_id = req.user._id

  try{
    const updatePatient = await Patients.updateOne({_id:user_id},{$set:{details:req.body}})
  res.json({data:updatePatient,message:"Data Updated Successfully"})
  }catch(err){
    res.json({message:`error occured => ${err}`})
  }
  
})
router.get('/getPatient/:id',async(req,res)=>{
  const id = req.params['id']
  try{
    const getPat = await Patients.findOne({_id:id})
    //console.log("calling from patients")
    res.json({data:getPat})
  }catch(err){
    console.log(`Error Occured ${err}`)
    res.json({message:`Error Occured ${err}`})
  }
})
router.delete('/delete/:id',async(req,res)=>{
  const id = req.params['id']
  try{
      const deletePatient = await Patients.deleteOne({ _id:id })
      res.json({data:deletePatient,message:"Deleted Patient"})
  }
  catch(err){
      res.json(`Error : ${err}`)
  }
})

router.get('/getPatient',patientAuth,async(req,res)=>{
  const user = req.user
  res.json({user:user})
})
router.get('/getDoctor/:patient_id',async(req,res)=>{
  const id = req.params['patient_id']
  const allApointments = await appointment.find({p_id:id})
  const allDoctor = await doctor.find()
  const array = []
  allApointments.map((ele)=>{
    if(!array.includes(ele.d_id)){
      array.push(ele.d_id)
    }
  })
  
  res.json({doctors:allDoctor,id:array})
})

router.post('/CheckPassword',patientAuth,async(req,res)=>{
  const user = req.user.password
  const pass = req.body.pass
  
  if(await bcrypt.compare(pass, user)){

    res.json({message:"Correct Password",auth:true})
 }else{
   res.json({message:"Incorrect Password",auth:false})
 }
})
router.post('/ChangePassword',patientAuth,async(req,res)=>{
  const user = req.user._id
  const newPassword = req.body.new_pass
  console.log(`${user}`,newPassword)
  const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(newPassword, saltPassword);
  const update = await Patients.findByIdAndUpdate({_id:`${user}`},{$set:{password:securePassword}})
  //console.log(update)
  res.json({message:"Password Updated!"})
})
module.exports = router