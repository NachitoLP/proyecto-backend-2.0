const { cartModel } = require("./models/cartsModel");

class CartManagerMongo{
    getCarts = async (limit,page) => {
        let cart = await cartModel.paginate({},{limit:limit||10, page:page, lean:true})
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
        let cart = await cartModel.find({_id: cartID})
        let productFound = cart.products.findIndex(product => product._id == prodID)

        if (productFound === -1) {
            cart.products.push({
                _id:prodID,
                quantity: 1
            })
            let resp = await cartModel.findByIdAndUpdate({_id: cartID}, cart)

            return resp
        }

        cart.products[productFound].quantity += 1
        let resp = await cartModel.findByIdAndUpdate({_id: cartID}, cart)

        return resp
    }

    deleteCart = async ( cartID ) => {
        return await cartModel.deleteOne({_id:cartID})
    }

    deleteProductInCart = async ( cartID , prodID ) => {
        let cart = await cartModel.find({_id: cartID})
        let productFound = cart.products.findIndex(product => product._id == prodID)

        if (productFound === -1) {
            return console.log("No existe ese producto en el carrito.");
        }
        let value = cart.products[productFound].quantity
        if (value == 1) {
            if (cart.products.length === 1){
                cart.products.shift()
                let resp = await cartModel.findByIdAndUpdate({_id:cartID}, cart)

                return resp
            }
            cart.products.splice(1,productFound)
            let resp = await cartModel.findByIdAndUpdate({_id:cartID}, cart)

            return resp
        }

        cart.products[productFound].quantity -= 1
        let resp = await cartModel.findByIdAndUpdate({_id: cartID}, cart)

        return resp
    }
}

module.exports = {
    CartManagerMongo
}