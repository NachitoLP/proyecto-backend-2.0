const { Schema , model } = require('mongoose');

const collection = 'carts';

const cartSchema = new Schema({
    id: {
        type: Number
    },
    products: [{
        name: String,
        quantity: Number
    }]
});

const cartModel = model(collection , cartSchema)

module.exports = {
    cartModel
}