const router = require('express').Router()
const {patientAuth} = require('../middleware.js/auth')
const multer = require('multer')
const Image = require('../model/Image')
const ImageRouter = require('express').Router()


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})


ImageRouter.route('/uploadmulter').post(upload.single('imageData'),(req,res,next)=>{
    console.log(res.body)
    const newImage = new Image({
        imageName:req.body.imageName,
        imageData:req.file.path
    })

    newImage.save()
    .then((result)=>{
        console.log(result)
        res.status(200).json({
            sucess:true,
            document:result,
            imagePath:req.body.imageName
        })
    })

    .catch((err)=>{
        res.json({message:`${err}`})
        next(err)
    })
})





/*
router.post('/',patientAuth,async(req,res)=>{
    const user_id = req.user._id
    if(req.files == null){
        return res.status(200).json({ msg: "No File Uploaded" });
    }
    const file = req.files.file;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const newFile = `${year} + "-" + ${month} + "-" + ${date}`;

    try{
        file.mv(`${__dirname}/uploads/${user_id}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                fileName: file.name,
                filePath: `/uploads/${file.name}`,
                file: req.files.file,
              });
            }
            console.log( file.name, `/uploads/${file.name}`,req.files.file)
          });
    }
    catch(err){
        console.log(`${err}`)
        res.json({message:`${err}`})
    }
    
})
*/
module.exports = ImageRouter