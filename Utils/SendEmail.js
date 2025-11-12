const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: testAccount.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    //sending mail
    const mailOPtions = {
        from: '"Card system" <no-replykebebhclovis.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    const info = await transporter.sendMail(mailOPtions);

    console.log("Email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;