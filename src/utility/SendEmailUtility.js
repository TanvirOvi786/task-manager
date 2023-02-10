var nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.ionos.com',
        port: '587',
        secure: false,
        auth: {
            user: "info@tanvirahmedovi.com",
            pass: 'tanvir786ovi'
        },
        tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Task Manager MERN <info@tanvirahmedovi.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return await transporter.sendMail(mailOptions);

}
module.exports = SendEmailUtility