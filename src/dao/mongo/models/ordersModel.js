const { Schema , model } = require('mongoose');

const collection = 'orders';

const orderSchema = new Schema({
    user: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    products: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: Number,
    created: Date
})

const orderModel = model(collection , orderSchema)

module.exports = {
    orderModel
}