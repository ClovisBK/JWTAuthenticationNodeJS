const {Resend} = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {

    try{

        const data = resend.emails.send({
           from: `"Card system" <noreply@kebehcard.vercel.app>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });


        console.log("Email sent:", data);
    }catch(error){
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;