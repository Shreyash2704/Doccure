const mongoose = require('mongoose')
const Appointmnet_Schema = mongoose.Schema({
    p_id:{
        type:String,
        required:true
    },
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
    d_specialist:{
        type:String,
        required:true
    },
    booking_date:{
        type:String,
        required:true
    },
    appointment_date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:false
    },
    follow_up:{
        type:String,
        required:false
    },
    p_image:{
        type:String,
        required:true
    },
    d_image:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model('appointment',Appointmnet_Schema)