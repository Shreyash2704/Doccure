const router = require('express').Router()
const Chat = require('../model/chat')

router.get('/',async(req,res)=>{
   const all_chats = await Chat.find()
   res.json(all_chats)
})
router.get('/:room_id',async(req,res)=>{
    const room_id = req.params['room_id']
    const all_chats = await Chat.find({room:room_id})
    res.json(all_chats)
 })
router.delete('/:id',async(req,res)=>{
    const id = req.params['id']
    const chat = await Chat.findByIdAndDelete({_id:id})
    res.json({message:"deleted",data:chat})
})
module.exports = router