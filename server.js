const express = require('express');
const cors = require('cors');
const app = express();
const nodeMailer = require('nodemailer');
const path = require('path');
app.use(express.static('public'));


const PORT = process.env.PORT || 5000;


//site map

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join('sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'robots.txt'));
});



// middleware

app.use(express.json());
app.use(cors());



app.post('/',(req, res)=>{
  
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS

}});
const mailOptions = {
  from: 'a88933513@gmail.com',
  replyTo: req.body.email,
  to: 'a88933513@gmail.com',
  subject: `Message from ${req.body.name}: ${req.body.email}`,
  text: `Hi star dev, ${req.body.name}, needs a ${req.body.type} his phone number is ${req.body.phone}he left a message: ${req.body.message}.`
};
transporter.sendMail(mailOptions, (error, info)=>{
  if(error){
    console.log(error);
    res.send('error');
  }else{
      console.log('email sent')
      res.send('success');
  }})});

app.listen(
    PORT,()=>{
        console.log(`server is runing on port ${PORT}`);
       
    }
)
