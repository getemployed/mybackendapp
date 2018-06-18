const express = require('express');
const router =express.Router();
const nodemailer = require('nodemailer');

router.post('/',(req,res,next)=>{
    var email=req.body.email;
    var link=req.body.link;
    var name=req.body.name;
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "mailtechnical9@gmail.com",
            pass: "Sound@123" 
        }
    });

    let mailOptions = {
        from: '"Debanik" <mailtechnical9@gmail.com>', // sender address
        to: email,// 'debanik@spineor.com', // list of receivers
        subject: 'Your Requested Information', // Subject line
        //text:"hello" // plain text body
        html: '<div text-center>Hello'+name+'<br> Please Download the information from this link:-<br>'+link+'</div>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({
                status:false,
                message:error
            });
        }
        else
        {
            res.json({
                message:"Email sent",
                status:true
            });
        }
         console.log('Message sent:', info.messageId);
    });
});
    
});

module.exports=router;