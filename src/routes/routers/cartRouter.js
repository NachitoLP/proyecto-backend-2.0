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

    .get('/add/:prodID' , addProductToCart)

    .get('/delete/:prodID' , deleteProductInCart) // No funciona
    
    .get('/getCarts', authRol("admin") , getCarts)
    
    .delete('/deleteCart/:cartID' , authRol("admin") , deleteCart)

module.exports = {
    cartRouter
}