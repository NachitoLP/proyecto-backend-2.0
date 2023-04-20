const { Router } = require('express');
const { CartManagerMongo } = require('../../dao/cartManagerMongo');

const cartRouter = Router();
const cartManager = new CartManagerMongo()


cartRouter.get('/', async ( req , res ) => {
    try {
        const {limit} = req.query;
        const newCart = await cartManager.getCarts()

        if (!newCart) {
            return res.status(400).send('No hay productos')
        }
        
        if (!limit) {
            return res.send(newCart)
        }

        let newCartLimit = newCart.slice(0,limit)
        return res.status(200).send(newCartLimit)
    } catch (error) {
        console.log(error);
    }
})

cartRouter.get('/:cartID', async ( req , res ) => {
    const { cartID } = req.params
    const newCart = await cartManager.getCartById(cartID)
    res.status(200).send(newCart)
})

cartRouter.post('/', async ( req , res ) => {
    const newCart = await cartManager.createCart({products: []})
    res.status(200).send(newCart)
})

cartRouter.post('/:cartID/products/:prodID' , async ( req , res ) => {
    const { cartID , prodID } = req.params
    const newProdInCart = await cartManager.addProductToCart( cartID , prodID )
    res.status(200).send(newProdInCart)
})

cartRouter.delete('/:cartID' , async ( req , res ) => {
    const { cartID } = req.params
    const deleteCart = await cartManager.deleteCart( cartID )
    res.status(200).send({
        cart: deleteCart,
        message: "Carrito borrado."
    })
})

cartRouter.delete('/:cartID/products/:prodID' , async ( req , res ) => {
    const { cartID , prodID } = req.params
    const deleteCart = await cartManager.deleteProductInCart( cartID , prodID )
    res.status(200).send({
        cart: deleteCart,
        message: "Producto borrado."
    })
})

module.exports = {
    cartRouter
}