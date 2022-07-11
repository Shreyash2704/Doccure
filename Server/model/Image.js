const mongoose = require('mongoose')
const Image =  mongoose.Schema({
    imageName:{
        type:String,
        required:true,
        default:"none"
    },
    imageData:{
       type:String,
       required:true
    }

})

module.exports = mongoose.model("image",Image)