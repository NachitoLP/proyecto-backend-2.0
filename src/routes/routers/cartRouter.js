const { Router } = require('express');
const { CartManagerMongo } = require('../../dao/cartManagerMongo');

const cartRouter = Router();
const cartManager = new CartManagerMongo()


cartRouter.get('/', async ( req , res ) => {
    const newCart = await cartManager.getCarts()
    res.status(200).send(newCart)
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

cartRouter.post('/:cartID/products/:prodName' , async ( req , res ) => {
    const { cartID , prodName } = req.params
    const newProdInCart = await cartManager.addProductToCart( cartID , prodName )
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

module.exports = {
    cartRouter
}