const { Router } = require('express');
const { sendSMS } = require('../../utils/twilioSMS');
const authRol = require('../../middleware/authRol');

const smsRouter = Router();

smsRouter.get('/' , authRol("usuario") , async ( req , res ) => {
    await sendSMS()
    res.send('Mensaje enviado.')
})

module.exports = smsRouter