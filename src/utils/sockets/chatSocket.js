const { MsgModelMongo } = require("../../dao/mongo/chatManagerMongo")

let msgModel = new MsgModelMongo()
const messages = []

const initChatSocket = (ioChat) => {
    ioChat.on('connection' , socket => {
        socket.on('message' , data => {
            messages.push(data)
            msgModel.createMessage(data.user, data.message)
            ioChat.emit('messageLogs' , messages)
        })

        socket.on('userAuthenticated', data => {
            socket.broadcast.emit('newUser' , data)
        })
    })
}

module.exports = initChatSocket