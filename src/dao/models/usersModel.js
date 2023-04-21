const { Schema , model } = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const collection = 'users';

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    }
});

userSchema.plugin(paginate)
const userModel = model(collection , userSchema)

module.exports = {
    userModel
}