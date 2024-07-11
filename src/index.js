 const express = require('express');
 const amqp = require("amqplib");
 const queueName = "email_queue";
 

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const mailSender = require('./config/email-config');
// const sendEmail = require('./utils/sendEmail');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://guest:guest@localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        setInterval(()=>{
        channel.sendToQueue(queueName, Buffer.from("Hello World"));
        },1000)
        return channel;
    } catch (error) {
        console.log(error);
    }
}

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    connect();
    console.log("connected to raabit");
});
