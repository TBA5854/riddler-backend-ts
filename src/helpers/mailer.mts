import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    // host: 'localhost',
    // port: 1025,
    service: 'gmail',
    auth: {
        user: 'tba235854@gmail.com',
        pass: process.env.APP_PASSWD
    }
});
const mailOptions = {
    from: "tba235854@gmail.com",
    to: "hemanthraja2004@gmail.com",
    subject: 'Hello World',
    text: 'Hi Hemanth'
};
  
for (let i = 0; i < 1; i++) {
  transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    console.log(data);
    // console.log(i)
    });
}