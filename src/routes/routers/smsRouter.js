const { Router } = require('express');
const { sendSMS } = require('../../utils/twilioSMS');

const smsRouter = Router();

smsRouter.get('/' , async ( req , res ) => {
    await sendSMS()
    res.send('Mensaje enviado.')
})

module.exports = smsRouter