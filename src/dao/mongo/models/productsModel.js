const { Schema , model } = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const collection = 'products';

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    href: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean
    }
});
productSchema.plugin(paginate)
const productsModel = model(collection , productSchema)

module.exports = {
    productsModel
}