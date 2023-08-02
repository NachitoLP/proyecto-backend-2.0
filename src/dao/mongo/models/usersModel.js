const { Schema , model } = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const collection = 'users';

const userSchema = new Schema({
    full_name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String
    },
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    },
    documents: [{
        name: String,
        reference: String
    }],
    last_connection: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(paginate)
const userModel = model(collection , userSchema)

module.exports = {
    userModel
}