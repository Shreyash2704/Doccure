const router = require('express').Router()

const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'hotmail',
    tls:{
      rejectUnauthorized:false
  },
  port: "2252",
    auth: {
      user: 'shreyashmatele274@outlook.com',
      pass: 'Shreyash@2704'
    }
  });

 
  
  router.get('/',(req,res)=>{
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(`Eroor Occured ${error}`)
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Email Send")
        }
      }); 
  })
router.post('/',async(req,res)=>{
    const id = req.body.id
    const sender = req.body.sender
     const receiver = req.body.to
     var mailOptions = {
        from: '',
        to: receiver,
        subject: `Your Appointment with ${sender} has started.`,
        html: `<h2>Your Appointment Section with ${sender} has been started.</h2><p>Your Access token for joining the session is <strong>${id}</strong>.Copy the id and paste it in video call section to join.</p>`,
        
      };   
     
   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(`Eroor Occured ${error}`)
    } else {
      console.log('Email sent: ' + info.response);
      res.send("Email Send")
    }
  }); 
})

router.post('/aptBooked',async(req,res)=>{
  
  const sender = req.body.sender
  const date = req.body.date
  const location = req.body.location
  const time = req.body.time
   const receiver = req.body.to
   const receiver2 = req.body.d_email
   const patient = req.body.patient
   var mailList = []
  
   
   mailList.push(receiver)
   mailList.push(receiver2)

   
   
   var mailOptions = {
      from: 'shreyashmatele274@outlook.com',
      to: mailList.join(),
      subject: `New Appointment between Dr.${sender} and ${patient} has been Scheduled on ${date}.`,
      html: `<p>Dear Customer,<br></br> New Appointment Section between Dr.${sender} and ${patient} has been scheduled with dr. ${sender} on ${date} at ${time}.</p>`,
      
    };   

   
 
 transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.send(`Eroor Occured ${error}`)
  } else {
    console.log('Email sent: ' + info.response);
    res.send("Email Send")
  }
});

})



router.post('/aptLabBooked',async(req,res)=>{
  
  const lab = req.body.lab
  const patient = req.body.patient
  const date_time = req.body.date_time
  const date = date_time.split('T')[0]
  const time = date_time.split('T')[1]
   const receiver = req.body.p_email
   const receiver2 = req.body.l_email
   const location = req.body.app_type === "0" ? req.body.location : "Home"

   
   
   var mailList = []
   mailList.push(receiver)
   mailList.push(receiver2)
   var mailOptions = {
      from: 'shreyashmatele274@outlook.com',
      to: mailList.join(),
      subject: `New Lab Appointment has been scheduled  on ${date}.`,
      html: `<p>Dear Customer,<br></br>Your Lab Appointment Section with ${lab} has been Setup on <strong>${date} at ${time} at ${location}.</strong></p>`,
      
    };   

 
 transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.send(`Eroor Occured ${error}`)
  } else {
    console.log('Email sent: ' + info.response);
    res.send("Email Send")
  }
}); 
 
})


/*
router.post('/aptBooked__',async(req,res)=>{
  
  const sender = req.body.sender
  const date = req.body.date
  const location = req.body.location
  const time = req.body.time
   const receiver = req.body.to
   const receiver2 = req.body.d_email
   const patient = req.body.patient
   

    var mailOptions2 = {
      from: 'shreyashmatele274@outlook.com',
      to: receiver2,
      subject: `Your Appointment with ${patient} has Confirmed on ${date}.`,
      html: `<p>Dear Customer,<br></br>Your Appointment Section with ${patient} has been Setup on ${date} at ${time}.</p>`,
      
    }; 
 
transporter.sendMail(mailOptions2, function(error, info){
  if (error) {
    console.log(error);
    res.send(`Eroor Occured ${error}`)
  } else {
    console.log('Email sent: ' + info.response);
    res.send("Email Send")
  }
}); 
})

router.post('/aptLabBooked__',async(req,res)=>{
  
  const lab = req.body.lab
  const patient = req.body.patient
  const date_time = req.body.date_time
  const date = date_time.split('T')[0]
  const time = date_time.split('T')[1]
   const receiver = req.body.p_email
   const receiver2 = req.body.l_email
   const location = req.body.app_type === "0" ? req.body.location : "Home"

   console.log(req.body)
   
   

    var mailOptions2 = {
      from: 'shreyashmatele274@outlook.com',
      to: receiver2,
      subject: `Your Appointment with ${patient} has Confirmed on ${date}.`,
      html: `<p>Dear Customer,<br></br>Your Appointment Section with ${patient} has been Setup on ${date} at ${time} at ${location}.</p>`,
      
    }; 
 

transporter.sendMail(mailOptions2, function(error, info){
  if (error) {
    console.log(error);
    res.send(`Eroor Occured ${error}`)
  } else {
    console.log('Email sent: ' + info.response);
    res.send("Email Send")
  }
}); 
})

  */

  module.exports = router