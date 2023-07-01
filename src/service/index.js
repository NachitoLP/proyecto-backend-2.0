const { ProductsDao, UsersDao, CartsDao, OrdersDao } = require("../dao/factory");
const CartRepository = require("../repositories/cart.repository");
const OrderRepository = require("../repositories/order.repository");
const ProductRepository = require("../repositories/products.repository");
const UserRepository = require("../repositories/user.repository");


const productService = new ProductRepository (new ProductsDao())
const userService = new UserRepository(new UsersDao())
const cartService = new CartRepository(new CartsDao())
const orderService = new OrderRepository(new OrdersDao())

module.exports = {
    productService,
    userService,
    cartService,
    orderService
}