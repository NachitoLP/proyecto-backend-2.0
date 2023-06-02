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

cartRouter
    .get('/', getCarts)

    .get('/:cartID', getCartByID)

    .post('/', createCart)

    .post('/:cartID/products/:prodID' , addProductToCart)

    .delete('/:cartID' , deleteCart)

    .delete('/:cartID/products/:prodID' , deleteProductInCart)


module.exports = {
    cartRouter
}