const { Router } = require('express');
const ordersRouter = Router();

const OrderManagerController = require('../../controllers/ordersController');

const {
    getOrder,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
} = new OrderManagerController()

ordersRouter
    .get('/', getOrder)

    .get('/:orderID', getOrderById)
    
    .post('/', addOrder)

    .put('/orderID' , updateOrder)

    .delete('/delete/:orderID', deleteOrder)


module.exports = {
    ordersRouter
}