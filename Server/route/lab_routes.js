const router = require('express').Router()
const { patientAuth, labAuth } = require('../middleware.js/auth')
const LabAppointment = require('../model/lab_appointments')
const Lab  = require('../model/lab')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/',async(req,res)=>{
    const lab_app = await LabAppointment.find()
    res.json({data:lab_app})
})
router.delete('/removeAll',async(req,res)=>{
    const allLabApp = await LabAppointment.remove({})
    res.json({message:allLabApp})
})
router.post('/',async(req,res)=>{
    const app_type = req.body.app_type
    const date = req.body.datetime.split('T')[0]
    const userid = req.body.user_id

    const ifAptmntExist = await LabAppointment.find({user_id:userid,app_type:app_type,date:date})
    if(ifAptmntExist.length !== 0){
        console.log(ifAptmntExist)
        res.json({message:`Appointment Exist.Only one appointement can be scheduled in a day`})
    }else{
        var test_cost = req.body.test

        const LapApp = new LabAppointment({
            lab_id:req.body.lab_id,
            lab_name:req.body.lab_name,
            lab_image:req.body.lab_image,
            user_id:req.body.user_id,
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            address:req.body.address,
            test:test_cost.split('-')[0],
            date:req.body.datetime.split('T')[0],
            time:req.body.datetime.split('T')[1],
            app_type:req.body.app_type,
            cost:test_cost.split('-')[1]
        })
        const savedata = await LapApp.save()
        res.json({message:`Appointment Booked`,data:savedata})
    }
})
router.get('/patient',patientAuth,async(req,res)=>{
    const user_id = req.user._id
    const aptmnt = await LabAppointment.find({user_id:user_id})
    res.json({data:aptmnt})
})
router.delete('/',async(req,res)=>{
    const allLab = await LabAppointment.remove({})
    res.json({message:allLab})
})

router.post('/login',async(req,res)=>{
    const email = req.body.email
  const lab = await Lab.findOne({email:email})
  if(lab !== null){
        if(await bcrypt.compare(req.body.password, lab.password)){
          const user_id = lab._id
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
  const exitingUser = await Lab.findOne({email:useremail})
  if(exitingUser === null){
    const saltPassword = await bcrypt.genSalt(10);
		const securePassword = await bcrypt.hash(req.body.password, saltPassword);
        const lab = new Lab({
          username:req.body.username,
          email:req.body.email,
          password:securePassword
        })

        try{
            const save = await lab.save()
            res.json({message:"Data Saved Sucessfully",data:save})
            console.log("Lab's Data Saved Sucessfully")
        }catch(err){
            console.log(`${err}`)
            res.json({message:err})
        }
  }else{
    res.json({message:`Lab user Email Exist! Please Try another one.`,auth:false})
  }
})

router.get('/allLabs',async(req,res)=>{
    const labs = await Lab.find()
    res.json({data:labs})
})
/*
router.get('/:id',async(req,res)=>{
    const id = req.params['id']
    const lab = await Lab.findById({_id:id})
    res.json({data:lab})
})*/

router.get('/getLab',labAuth,async(req,res)=>{
    const user = req.user
    res.json({user:user})
})

router.post('/update',labAuth,async(req,res)=>{
  const lab_id = req.user._id
  const details = {
    name:req.body.name,
    email:req.body.email,
    contact:req.body.contact,
    city:req.body.city,
    state:req.body.state,
    country:req.body.country,
    address:req.body.address,
    zipcode:req.body.zipcode,
    imageUrl:req.body.imageUrl,
    services : req.body.services
  }
  console.log(req.body)
  const services = req.body.services
  const update = await Lab.findByIdAndUpdate({_id:lab_id},{$set:{details:details,services:services}})
  res.json({data:update,message:`Data Updated Successfully`})
})

router.get("/lab/:id",async(req,res)=>{
    const id = req.params['id']
    const lab = await Lab.findById({_id:id})
    res.json({lab:lab})
})

router.get('/getAppointment',labAuth,async(req,res)=>{
    const user = req.user._id
    const lapAppt = await LabAppointment.find({lab_id:user})
    res.json({data:lapAppt})
    
})
router.get('/getAppointment/:id',async(req,res)=>{
    const id = req.params['id']
    const lapAppt = await LabAppointment.findById({_id:id})
    res.json({data:lapAppt})
    
})

//update lab appointment status
router.post('/updateStatus',async(req,res)=>{
   const _id = req.body.lab_id
   const reportFile = req.body.file
   console.log(_id,reportFile)
   const updateLabApp = await LabAppointment.findByIdAndUpdate({_id:_id},{$set:{status:true,reportFile:reportFile}})
   console.log(updateLabApp)
   res.json({message:"Data Updated.",data:updateLabApp})
})
module.exports = router