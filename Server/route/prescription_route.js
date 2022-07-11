const router = require('express').Router()
const { doctorAuth, patientAuth } = require('../middleware.js/auth')
const Prescription = require('../model/prescription')

router.get('/',async(req,res)=>{
    const prescription = await Prescription.find()
    res.json({data:prescription})
})
router.post('/',async(req,res)=>{
    const prescription = new Prescription({
        d_id:req.body.d_id,
        d_name:req.body.d_name,
        p_name:req.body.p_name,
        d_image:req.body.d_image,
        p_image:req.body.p_image,
        p_id:req.body.p_id,
        date:req.body.date,
        prescription_list:req.body.prescription_list
    })

    try{
        const savePres = await prescription.save()
        res.json({data:savePres,message:"Data Saved."})
    }catch(err){
        res.json(`Error: ${err}`)
    }
})

router.get('/doctor',doctorAuth,async(req,res)=>{
    const user_id = req.user._id
    const allPres = await Prescription.find({d_id:user_id})
    res.json({data:allPres})

})
router.get('/patient',patientAuth,async(req,res)=>{
    const user_id = req.user._id
    const allPres = await Prescription.find({p_id:user_id})
    res.json({data:allPres})
})
router.get('/:id',async(req,res)=>{
    const id = req.params['id']
    const pres = await Prescription.findById({_id:id})
    res.json({data:pres})
})
router.delete('/removeAll',async(req,res)=>{
    const allDoc = await Prescription.remove({})
    res.json({message:allDoc})
})

module.exports = router