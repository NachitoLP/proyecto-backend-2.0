const { Router } = require('express');
const CartManagerController = require('../../controllers/cartController');
const cartRouter = Router();
const cartRouterAdmin = Router();

const {
    getCarts,
    getCartByID,
    addProductToCart,
    deleteCart,
    deleteProductInCart,
    purchaseCart
} = new CartManagerController()

cartRouter
    .get('/', getCartByID)

    .get('/purchase' , purchaseCart)

    .get('/:prodID' , addProductToCart)

    .get('/productDelete/:prodID' , deleteProductInCart) // No funciona

cartRouterAdmin
    .get('/', getCarts)

    .delete('/:cartID' , deleteCart)

module.exports = {
    cartRouter,
    cartRouterAdmin
}