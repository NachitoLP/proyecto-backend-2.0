const { CartManagerMongo } = require("../dao/cartManagerMongo");
const cartManager = new CartManagerMongo()

class CartManagerController {
    getCarts = async ( req , res ) => {
        try {
            const {limit,page} = req.query;
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage} = await cartManager.getCarts(limit,page)
    
            if (!docs) {
                return res.status(400).send('No hay productos')
            }
            
            return res.status(200).render('carts', {
                newCart:docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    getCartByID = async ( req , res ) => {
        try {
            const { cartID } = req.params
            const newCart = await cartManager.getCartById(cartID)
            return res.status(200).render('carts', {newCart})
        } 
        catch (error) {
            console.log(error);
        }
    }

    createCart = async ( req , res ) => {
        try {
            const newCart = await cartManager.createCart({products: []})
            res.status(200).send(newCart)
        } 
        catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async ( req , res ) => {
        try {
            const { cartID , prodID } = req.params
            const newProdInCart = await cartManager.addProductToCart( cartID , prodID )
            res.status(200).send(newProdInCart)
        } 
        catch (error) {
            console.log(error);
        }
    }

    deleteCart = async ( req , res ) => {
        try {
            const { cartID } = req.params
            const deleteCart = await cartManager.deleteCart( cartID )
            res.status(200).send({
                cart: deleteCart,
                message: "Carrito borrado."
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    deleteProductInCart = async ( req , res ) => {
        try {
            const { cartID , prodID } = req.params
            const deleteCart = await cartManager.deleteProductInCart( cartID , prodID )
            res.status(200).send({
                cart: deleteCart,
                message: "Producto borrado."
            })
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartManagerController
