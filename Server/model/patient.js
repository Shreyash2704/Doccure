const mongoose = require('mongoose')

const Patients = mongoose.Schema({
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
    }
})

module.exports = mongoose.model('patients',Patients)