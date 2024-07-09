const EmailService = require('../services/email-service');

async function create(req,res){
    try {
        const response = await EmailService.createTicket({
            subject:req.body.subject,
            content:req.body.content,
            recipientEmail:req.body.recipientEmail,
        })
         res.status(201).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}

module.exports={
    create,
}