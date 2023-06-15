const { Schema , model } = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const collection = 'products';

const productSchema = new Schema({
    title: {
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
    department: {
        type: String
    },
    href: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
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