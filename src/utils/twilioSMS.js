const twilio = require('twilio')
const { objConfig } = require('../config/config')
const { twilio_phone , twilio_auth_ID , twilio_account_ID , my_phone } = objConfig

const cliente = twilio(twilio_account_ID , twilio_auth_ID)

exports.sendSMS = async () => {
    await cliente.messages.create({
        body: 'Esto es un mensaje de prueba.',
        from: twilio_phone,
        to: my_phone
    })
}