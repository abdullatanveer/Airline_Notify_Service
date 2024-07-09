// require("dotenv").config();
const express = require('express');
 

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const mailSender = require('./config/email-config');
// const sendEmail = require('./utils/sendEmail');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // try {
    //     const response = await mailSender.sendMail({
    //         from : ServerConfig.GMAIL_EMAIL,
    //         to : 'abdullahch8860@gmail.com',
    //         subject : 'Hello',
    //         text:'node mailer testing'

    //     })
    //     console.log(response)
    // } catch (error) {
    //     console.log(error)
    // }
        
    
});
