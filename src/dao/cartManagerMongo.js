const { cartModel } = require("./models/cartsModel");

class CartManagerMongo{
    getCarts = async () => {
        let cart = await cartModel.find()
        if(cart.length == 0) {
            return console.log("No existe ningún carrito.");
        }
        return cart
    }

    createCart = async ( cart ) => {
        return await cartModel.create(cart)
    }

    getCartById = async ( cartID ) => {
        let cart = await cartModel.find({_id:cartID})
        if(cart.length == 0) {
            return console.log("No existe el carrito.");
        }
        return cart
    }

    addProductToCart = async ( cartID, prodID ) => {
        let cart = cartModel.findById({_id: cartID})
        cart.products.push({product: prodID})
        let resp = await cartModel.findByIdAndUpdate({_id: cartID}, {products: products})

        return resp
    }

    deleteCart = async ( cartID ) => {
        return await cartModel.deleteOne({_id:cartID})
    }
}

module.exports = {
    CartManagerMongo
}