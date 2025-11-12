const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    try{

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });


        const mailOPtions = {
            from: `"Card system" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        };
        const info = await transporter.sendMail(mailOPtions);
        console.log("Email sent: %s", info.messageId);
    }catch(error){
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;