var nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: "tanvirahnmedovi.main@gmail.com",
            pass: 'erukfixdyfhfrkul'
        }
    });


    let mailOptions = {
        from: 'Task Manager MERN <tanvirahnmedovi.main@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return await transporter.sendMail(mailOptions);

}
module.exports = SendEmailUtility