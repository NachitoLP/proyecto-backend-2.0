const { Router } = require('express');
const { sendMailTransport } = require('../../utils/nodemailer');

const mailRouter = Router();

mailRouter.get('/' , async ( req , res ) => {
    try {
        await sendMailTransport()
        return res.send('Mail enviado')
    } catch (error) {
        console.log(error);
    }
})

module.exports = mailRouter