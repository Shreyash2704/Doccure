const mongoose = require('mongoose')
const Pdf =  mongoose.Schema({
    pdfName:{
        type:String,
        required:true,
        default:"none"
    },
    pdfData:{
       type:String,
       required:true
    }

})

module.exports = mongoose.model("pdf",Pdf)