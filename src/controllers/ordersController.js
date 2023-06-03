const { OrdersDao } = require("../dao/factory");
const orderManager = new OrdersDao()


class OrderManagerController {
    getOrder = async ( req , res ) => {
        try {
            let orders = await orderManager.get()

            if (!orders) return res.status(401).send('No hay órdenes disponibles por el momento.')

            return res.status(201).send({
                status: 'success',
                payload: orders
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    getOrderById = async ( req , res ) => {
        try {
            const { orderID } = req.params
            let order = await orderManager.getById(orderID)
            
            if (!order) return res.status(401).send('No se encontró una orden con esa ID.')
            

            return res.status(201).send({
                status: 'success',
                payload: order
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    addOrder = async ( req , res ) => {
        try {
            const {body} = req
            let result = await orderManager.create(body)
            
            return res.status(201).send({
                status: 'success',
                payload: result
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    updateOrder = async ( req , res ) => {
        try {
            const {id} = req.params
            const {body} = req
            let result = await orderManager.update(id , body)
            
            return res.status(201).send({
                status: 'success',
                payload: result
            })
        } 
        catch (error) {
            console.log(error);
        }
    }

    deleteOrder = async ( req , res ) => {
        try {
            const { orderID } = req.params
        
            let deletedOrder = await orderManager.delete(orderID)

            if (!deletedOrder) return res.status(401).send({status: 'Error.', message: 'Órden no encontrada.'})
            
            return res.status(200).send({message: 'Orden borrada', deletedOrder})
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = OrderManagerController