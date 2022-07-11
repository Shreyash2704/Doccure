const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    room:{type:String},
    author:{type:String},
    author_id:{type:String},
    message:{type:String},
    time:{type:String}
})

module.exports = mongoose.model('Chats',chatSchema)