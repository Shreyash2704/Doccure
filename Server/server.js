const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PatientRoute = require('./route/patient')
const DoctorRoute = require('./route/doctor_route')
const app = express()
const ImageRoute = require('./route/imageUpload')
const path = require('path');
const AppointmentRoute = require('./route/appointment_route')
const server = require("http").createServer(app);
const Chat = require('./model/chat')
const ChatRouter = require('./route/chat')
const PrescriptionRouter = require('./route/prescription_route')
const LabAppointmentRoute = require('./route/lab_routes')
const AdminRoutes = require('./route/admin_route')
const MailRoute = require('./route/sendMail')
const PdfRoute = require('./route/PdfUpload')
//middlewares

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});


app.use(cors());

app.use('/uploads',express.static('uploads'))
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
    res.header("Access-Control-Allow-Headers","x-requested-with, Content-Type, origin, authorization, accept, client-security-token")
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))






app.use('/patients',PatientRoute)
app.use('/doctor',DoctorRoute)
app.use('/imageUpload',ImageRoute)
app.use('/appointment',AppointmentRoute)
app.use('/chat',ChatRouter)
app.use('/prescription',PrescriptionRouter)
app.use('/lab_appointment',LabAppointmentRoute)
app.use('/admin_route',AdminRoutes)
app.use('/sendmail',MailRoute)
app.use('/pdfupload',PdfRoute)

const uri = 'mongodb+srv://shreyash2704:shreyash2704@cluster0.3uuye.mongodb.net/doccure?retryWrites=true&w=majority'
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }).then(()=>{
console.log(`successfully connected`);
}).catch((e)=>{
console.log(`not connected ${e}`);
})

app.get('/',(req,res)=>{
    res.send('hello from server')
})

app.get("/uploads/:image", (req, res) => {
    const imageName = req.params['image']
    res.sendFile(path.join(__dirname, `./uploads/${imageName}`));
  });


  io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

	//------chat----------
	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data}`);
	  });
	  socket.on('error', function (err) {
		console.log(err);
	  });
	  socket.on("send_message",async(data) => {
		  const chat = new Chat({
			room: data.room,
			author: data.author,
			author_id: data.author_id,
			message: data.message,
			time: data.time
		  })
		  try{
			const saved = await chat.save()
			socket.to(data.room).emit("receive_message", data);
			//console.log(saved)
		  }catch(err){
			  console.log(`${err}`)
		  }
		
		  
		  
	  });
});


const PORT = 5000
server.listen(PORT,()=>{
    console.log("Server listening on port 5000")
})