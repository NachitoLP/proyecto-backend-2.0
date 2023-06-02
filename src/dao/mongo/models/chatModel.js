const { Schema , model } = require('mongoose');

const collection = 'messages';

const msgSchema = new Schema({
    user: {
        type: String
    },
    message: {
        type: String
    }
});

const msgModel = model(collection , msgSchema)

module.exports = {
    msgModel
}