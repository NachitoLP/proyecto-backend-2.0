const { msgModel } = require("./models/chatModel");

class MsgModelMongo{
    createMessage = async ( user , message ) => {
        return await msgModel.create({user: user, message: message})
    }
}

module.exports = {
    MsgModelMongo
}