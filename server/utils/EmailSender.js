const nodemailer = require('nodemailer');

class EmailSender {  // needs to be tested
    constructor() {
        this.setUp();
    };

    setUp = () => {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bierkastenzaehler@gmail.com',  // my_cv@gmail.com
                pass: process.env.EMAIL_PASSWORD
            }
        });
    };

    setOptions = (to, subject, text) => {
        this.mailOptions = {
            to: to,
            subject: subject,
            text: text
        };
    };

    send = () => {
        this.transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }).then();
    };
}

module.exports = EmailSender;
