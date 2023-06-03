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

const sendMailTransport = async () => {
    transport.sendMail({
        from: `Coder test ${objConfig.gmail_user}`,
        to: `${objConfig.gmail_user}`,
        subject: 'Correo de prueba',
        html: `
            <h3>Correo del más capito</h3>
            <div>
                <p>Puto el que lee</p>
            </div>
        `,
        attachments: []
    })
}

module.exports = {
    sendMailTransport
}
