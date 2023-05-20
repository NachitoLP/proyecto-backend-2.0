const { ProductManagerMongo } = require("../../dao/productManagerMongo")

let productManager = new ProductManagerMongo()

const initReal = (ioReal) => {
    ioReal.on('connection' , socket => {
        console.log("Usuario conectado")

        socket.on('newProduct' , async data => {
            const newProduct = data
            newProduct.status = true
            let newArray = await productManager.addProduct(newProduct)

            ioReal.emit('newArrayProducts' , newArray)
        })
    })
}
module.exports = initReal