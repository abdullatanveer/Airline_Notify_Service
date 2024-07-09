const nodemailer= require('nodemailer');
const {  SMTP_MAIL, SMTP_PASS,SMTP_HOST,SMTP_PORT, SMTP_SERVICE } = require('./server-config');

 const mailSender = nodemailer.createTransport({
    host:  SMTP_HOST,
    port: SMTP_PORT,
    service: SMTP_SERVICE,
    auth: {
        user:SMTP_MAIL,
        pass: SMTP_PASS
    }
 })
 module.exports = mailSender;
