const mongoose = require('mongoose')

const Doctor = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    details:{
        type:Object,
        required:false
    },
    contact_details:{
        type:Object,
        required:false
    },
    clinic_info:{
        type:Object,
        required:false
    },
    medical_reg:{
        type:Object,
        required:false
    },
    education:{
        type:Array,
        required:false
    },
    experince:{
        type:Array,
        required:false
    },
    service:{
        type:Array,
        required:false
    },
    specialization:{
        type:Array,
        required:false
    },
    verified:{
        type:Boolean,
        required:false,
        default:false
    }

})

module.exports = mongoose.model('doctor',Doctor)