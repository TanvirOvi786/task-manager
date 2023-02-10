var nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'stmp.gmail.com',
        secure: false,
        auth: {
            user: "tanvirahnmedovi.main@gmail.com",
            pass: 'lhdrpauqvpnoafbp'
        }, tls: {
            rejectUnauthorized: true
        },
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