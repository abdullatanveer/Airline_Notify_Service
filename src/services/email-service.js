const TicketRepository = require("../repositories/ticket-repository");
const {Mailer} = require('../config');
const ticketRepo = new TicketRepository ();

async function sendEmail(mailForm, mailTo, subject, message){
    try {
        const response = await Mailer.sendMail({
            from :mailForm,
            to : mailTo,
            subject : subject,
            message:message,

        })
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
    }
}

async  function createTicket(data){
    try {
        return await ticketRepo.create(data);
    } catch (error) {
        throw error;
    }
}

async function getPendingEmails(){
    try {
        const response = await ticketRepo.getPendingTickets();
        return response;
    } catch (error) {
        throw error;
    }
}
module.exports={
    sendEmail,
    createTicket,
    getPendingEmails,

}