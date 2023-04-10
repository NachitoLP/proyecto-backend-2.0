const { Router } = require('express');
const { CartManager } = require('../../managers/fs/cartManager');

const cartRouter = Router();
const cartManager = new CartManager()


cartRouter.get('/', async ( req , res ) => {
    const newCart = await cartManager.readCartFile()
    res.send(newCart)
})

cartRouter.get('/:cartID', async ( req , res ) => {
    const { cartID } = req.params
    const newCart = await cartManager.getCartById(cartID)
    res.send(newCart)
})

cartRouter.post('/', async ( req , res ) => {
    const newCart = await cartManager.createCart({products: []})
    res.send(newCart)
})

cartRouter.post('/:cartID/products/:prodID' , async ( req , res ) => {
    const { cartID , prodID } = req.params
    const newProdInCart = await cartManager.addProductToCart( cartID , prodID )
    res.send(newProdInCart)
})

module.exports = {
    cartRouter
}