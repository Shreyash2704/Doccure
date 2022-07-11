const mongoose = require('mongoose')

const Lab_Schema = mongoose.Schema({
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
        required:false,
        default:null
    },
    image:{
        type:String,
        required:false
    },
    services:{
        type:Array,
        required:false
    }
})

module.exports = mongoose.model('lab',Lab_Schema)