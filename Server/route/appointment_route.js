const router = require('express').Router()
const Doctor = require('../model/doctor')
const Patient = require('../model/patient')
const Appoinments = require('../model/appointment')
const { patientAuth, doctorAuth } = require('../middleware.js/auth')

router.get('/',async(req,res)=>{

    try{
        const all_apt = await Appoinments.find()
        res.json({data:all_apt})
    }
    catch(err){
        console.log(`Error Occured: ${err}`)
        res.json({message:`Error Occured: ${err}`})
    }
    
})

router.post('/',async(req,res)=>{
    const doct = req.body.d_id
    const pat = req.body.p_id
    const book_date = req.body.booking_date
    const apt_date = req.body.appointment_date
    const time = req.body.time


    const if_apt_exist = await Appoinments.findOne({p_id:pat,d_id:doct,appointment_date:apt_date,time:time})
    //console.log(if_apt_exist)
    if(if_apt_exist === null){
        const appointment = new Appoinments({
            p_id:req.body.p_id,
            d_id:req.body.d_id,
            booking_date:req.body.booking_date,
            appointment_date:req.body.appointment_date,
            time:req.body.time,
            amount:req.body.amount,
            p_image:req.body.p_image,
            d_image:req.body.d_image,
            d_name:req.body.d_name,
            d_specialist:req.body.d_specialist,
            p_name:req.body.p_name
        })
        try{
            const scheduleApt = await appointment.save()
            res.json({data:scheduleApt,message:"Appointment Scheduled",signal:true})
        }
        catch(err){
            res.json({
                message:`Error Occured: ${err}` ,
                signal:false})
        }
       
    }
    else{
        res.json({message:"Appointment already scheduled",signal:false})
    }
})

router.get('/getPatientAppointment',patientAuth,async(req,res)=>{
    const user = req.user._id

    try{
        const appointment = await Appoinments.find({p_id:user})
        res.json({data:appointment})
    }catch(err){
        console.log(`Error Occured : ${err}`)
    }
   
})
router.get('/getDoctorAppointment',doctorAuth,async(req,res)=>{
    const user = req.user._id
    try{
        const array = []
        const appointment = await Appoinments.find({d_id:user}).sort({appointment_date:1})
        const allPatients = await Patient.find()
        
        appointment.map((ele)=>{
            const body = {}
            const p_id = ele.p_id
            allPatients.map((patient)=>{
                var a = false;
                if(patient._id == p_id && !a){
                    body._id = ele._id
                    body.p_id = ele.p_id,
                    body.d_id = ele.d_id,
                    body.booking_date = ele.booking_date,
                    body.appointment_date = ele.appointment_date,
                    body.time = ele.time,
                    body.amount = ele.amount,
                    body.p_image = ele.p_image,
                    body.d_image = ele.d_image,
                    body.d_name = ele.d_name,
                    body.d_specialist = ele.d_specialist,
                    body.p_name = ele.p_name,
                    body.p_email = patient.email,
                    body.p_city = patient.details.city,
                    body.p_state = patient.details.state,
                    body.p_contact = patient.details.contact
                    body.status = ele.status === undefined ? "false":ele.status
                    a = true
                    array.push(body)
                }
                
            })
        })

        //console.log(array)
        return res.json({data:array})

        /*
         const obj = await appointment.map(async(ele)=>{
            const body = {}
            const patient = await Patient.findById({_id:ele.p_id})
            body.p_id = ele.p_id,
            body.d_id = ele.d_id,
            body.booking_date = ele.booking_date,
            body.appointment_date = ele.appointment_date,
            body.time = ele.time,
            body.amount = ele.amount,
            body.p_image = ele.p_image,
            body.d_image = ele.d_image,
            body.d_name = ele.d_name,
            body.d_specialist = ele.d_specialist,
            body.p_name = ele.p_name,
            body.p_email = patient.email,
            body.p_city = patient.details.city,
            body.p_state = patient.details.state,
            body.p_contact = patient.details.contact
        
            return body
        
        })*/

        
        
    }catch(err){
        console.log(`Error Occured : ${err}`)
    }
   
})
router.post('/updateStatus',async(req,res)=>{
    const _id = req.body.user_id
    try{
        const aptment = await Appoinments.findByIdAndUpdate({_id:_id},{$set:{status:"true"}})
        res.json({message:"Status Updated",data:aptment})
    }catch(err){
        res.json({message:`Error ${err}`})
    }
})
router.post('/update/:id',patientAuth,async(req,res)=>{
    const user = req.user._id
    const id= req.params['id']
    try{
        const appointment = await Appoinments.findByIdAndUpdate({_id:id},{$set:{p_name:"Shreyash Matele"}})
        res.json({data:appointment,message:"Data Updated"})
    }catch(err){
        console.log(`Error Occured : ${err}`)
    }
})
module.exports = router