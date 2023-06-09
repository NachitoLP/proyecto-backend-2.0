const { orderService } = require("../service");
const { logger } = require("../utils/logger");



class OrderManagerController {
    getOrder = async ( req , res ) => {
        try {
            let orders = await orderService.get()

            if (!orders) return res.status(401).send('No hay órdenes disponibles por el momento.')

            return res.status(201).send({
                status: 'success',
                payload: orders
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    getOrderById = async ( req , res ) => {
        try {
            const { orderID } = req.params
            let order = await orderService.getById(orderID)
            
            if (!order) return res.status(401).send('No se encontró una orden con esa ID.')
            

            return res.status(201).send({
                status: 'success',
                payload: order
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    addOrder = async ( req , res ) => {
        try {
            const {body} = req
            let result = await orderService.create(body)
            
            return res.status(201).send({
                status: 'success',
                payload: result
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    updateOrder = async ( req , res ) => {
        try {
            const {id} = req.params
            const {body} = req
            let result = await orderService.update(id , body)
            
            return res.status(201).send({
                status: 'success',
                payload: result
            })
        } 
        catch (error) {
            logger.error(error);
        }
    }

    deleteOrder = async ( req , res ) => {
        try {
            const { orderID } = req.params
        
            let deletedOrder = await orderService.delete(orderID)

            if (!deletedOrder) return res.status(401).send({status: 'Error.', message: 'Órden no encontrada.'})
            
            return res.status(200).send({message: 'Orden borrada', deletedOrder})
        } 
        catch (error) {
            logger.error(error);
        }
    }
}

module.exports = OrderManagerController