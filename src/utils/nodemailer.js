const nodemailer = require('nodemailer')
const { objConfig } = require('../config/config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: '587',
    auth: {
        user: objConfig.gmail_user,
        pass: objConfig.gmail_pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendMailTransport = async (email , oid) => {
    transport.sendMail({
        from: `Coder test ${objConfig.gmail_user}`,
        to: `${email}`,
        subject: 'Recibo de compra.',
        html: `
            <h3>Su compra ha sido realizada con éxito.</h3>
            <div>
                <p>Le dejamos el ID del ticket. No estaremos comunicando a la brevedad para acordar el envío.</p>
                <p>ID: ${oid}</p>
            </div>
        `,
        attachments: []
    })
}

module.exports = {
    sendMailTransport
}
