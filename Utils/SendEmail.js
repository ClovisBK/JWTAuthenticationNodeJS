const nodemailer = require("nodemailer");

const sendEmail = async ({to, subject, html}) => {

    try{

        const transporter =  nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from:  `"Kebeh Card" <${process.env.EMAIL_FROM}`,
            to,
            subject,
            html,
        });
        console.log("Resend email sent:", info.messageId);
    }catch(error){
        console.error("Resend email error:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;


