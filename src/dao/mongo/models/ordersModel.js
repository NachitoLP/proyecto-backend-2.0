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
    status: Boolean,
    total: Number,
    purchase_datetime: Date
})

const orderModel = model(collection , orderSchema)

module.exports = {
    orderModel
}