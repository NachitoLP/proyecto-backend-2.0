const { objConfig } = require("../config/config");
const MongoSingleton = require("../utils/mongoSingleton");

let ProductsDao
let UsersDao
let CartsDao
let OrdersDao

switch (objConfig.persistence) {
    case 'MONGO':
        MongoSingleton.getInstance()
        // Products
        const {ProductManagerMongo} = require('./mongo/productManagerMongo')
        ProductsDao = ProductManagerMongo

        // Users
        const {UserManagerMongo} = require('./mongo/userManagerMongo')
        UsersDao = UserManagerMongo
        
        // Carts
        const {CartManagerMongo} = require('./mongo/cartManagerMongo')
        CartsDao = CartManagerMongo

        // Orders
        const {OrderManagerMongo} = require('./mongo/orderManagerMongo')
        OrdersDao = OrderManagerMongo
        break;
        
    case 'MEMORY': 
        // Products
        const ProductsDaoMemory = require('./memory/productManagerMemory')
        ProductsDao = ProductsDaoMemory

        // Users
        const UsersDaoMemory = require('./memory/userManagerMemory')
        UsersDao = UsersDaoMemory
        
        // Carts
        const CartsDaoMemory = require('./memory/cartManagerMemory')
        CartsDao = CartsDaoMemory
        break;

    case 'FILE':
        // Products
        const {ProductManager} = require('./fs/productManager')
        ProductsDao = ProductManager
        
        // Carts
        const CartsDaoFS = require('./fs/cartManager')
        CartsDao = CartsDaoFS
        break;

    default:
        MongoSingleton.getInstance()
        // Products
        const ProductDaoDefault = require('./mongo/productManagerMongo')
        ProductsDao = ProductDaoDefault.ProductManagerMongo

        // Users
        const UsersDaoDefault = require('./mongo/userManagerMongo')
        UsersDao = UsersDaoDefault.UserManagerMongo

        // Carts
        const CartsDaoDefault = require('./mongo/cartManagerMongo')
        CartsDao = CartsDaoDefault.CartManagerMongo
        break;
}

module.exports = {
    ProductsDao,
    UsersDao,
    CartsDao,
    OrdersDao
}