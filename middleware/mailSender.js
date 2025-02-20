const mailSender = require("nodemailer")

const emailSend =async (mail, sub, text)=>{
    const transport = mailSender.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
    })
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: mail,
        subject: sub,
        text: text,
    }
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = emailSend