const mongoose = require('mongoose')
const PrescriptionScheama =  mongoose.Schema({
    d_id:{
        type:String,
        required:true
    },
    d_name:{
        type:String,
        required:true
    },
    p_name:{
        type:String,
        required:true
    },
    d_image:{
        type:String,
        required:true
    },
    p_image:{
        type:String,
        required:true
    },
    p_id:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    prescription_list:{
        type:Array,
        required:true
    }
    
})

module.exports = mongoose.model('prescription',PrescriptionScheama)