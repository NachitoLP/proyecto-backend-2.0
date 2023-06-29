const { Router } = require('express');
const CartManagerController = require('../../controllers/cartController');
const authRol = require('../../middleware/authRol');
const cartRouter = Router();

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

    .get('/', authRol("admin") , getCarts)

    .delete('/:cartID' , authRol("admin") , deleteCart)

module.exports = {
    cartRouter
}