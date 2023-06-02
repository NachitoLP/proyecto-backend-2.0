const { Schema , model } = require('mongoose');
const paginate = require('mongoose-paginate-v2')


const collection = 'carts';

const cartSchema = new Schema({
    products: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

cartSchema.pre('find' , function() {
    this.populate('products._id')
})

cartSchema.plugin(paginate)
const cartModel = model(collection , cartSchema)

module.exports = {
    cartModel
}