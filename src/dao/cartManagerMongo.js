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
        let cartsArray = await cartModel.find()
        if (cartsArray.length === 0){
            cart.id = 1
        }
        else {
            cart.id = cartsArray[cartsArray.length-1].id + 1
        }
        return await cartModel.create(cart)
    }

    getCartById = async ( cartID ) => {
        let cart = await cartModel.find({id:cartID})
        if(cart.length == 0) {
            return console.log("No existe el carrito.");
        }
        return cart
    }

    addProductToCart = async ( cartID, prodName ) => {
        return await cartModel.updateOne({id:cartID},{products: [
            {
                name: prodName,
                quantity: 1
            }
        ] })
    }

    deleteCart = async ( cartID ) => {
        return await cartModel.deleteOne({id:cartID})
    }
}

module.exports = {
    CartManagerMongo
}