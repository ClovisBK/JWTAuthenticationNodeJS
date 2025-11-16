const axios = require("axios");

const sendEmail = async ({to, subject, html}) => {

    try{

        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",

            {
           sender:{
                email: process.env.BREVO_SENDER_EMAIL,
                name: process.env.BREVO_SENDER_NAME || kebehcard,
           },

            to: [{email: to}],
            subject,
            htmlContent: html,
             },
             {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json",
                },
             }
    );


        console.log("Brevo email sent:", response.data);
    }catch(error){
        console.error(
            "Brevo email error:",
            error.response?.data || error.message || error
        );
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;


// re_CCVJnjjZ_EBF9MAywpbZ8gnAjzs6hUPxs