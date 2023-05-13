const { Router } = require('express');
const CartManagerController = require('../../controllers/cartController');
const cartRouter = Router();

const {
    getCarts,
    getCartByID,
    createCart,
    addProductToCart,
    deleteCart,
    deleteProductInCart
} = new CartManagerController()

cartRouter.get('/', getCarts)

cartRouter.get('/:cartID', getCartByID)

cartRouter.post('/', createCart)

cartRouter.post('/:cartID/products/:prodID' , addProductToCart)

cartRouter.delete('/:cartID' , deleteCart)

cartRouter.delete('/:cartID/products/:prodID' , deleteProductInCart)

module.exports = {
    cartRouter
}