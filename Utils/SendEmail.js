const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({to, subject, html}) => {

    try{

        const response = await resend.emails.send({

            from: "kebehCard <onboarding@resend.dev>",
            to,
            subject,
            html
        }      
    );
        console.log("Resend email sent:", response);
    }catch(error){
        console.error("Resend email error:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;


