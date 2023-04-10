const fs = require("fs");
const route = "./archivos/cart.json"

class CartManager {
    constructor() {
        this.route = route
    }
    readCartFile = async () => {
        try {
            if (fs.existsSync(this.route)){
                const cart = await fs.promises.readFile(this.route, 'utf-8')
                return JSON.parse(cart)
            }
            return []
        }
        catch (err) {
            return []
        }
    }

    createCart = async ( cart ) => {
        try {
            let carts = await this.readCartFile()
            if (carts.length === 0) {
                carts.push({id:1, ...cart})
            }
            else {
                carts.push({id: carts[carts.length-1].id + 1, ...cart})
            }
            await fs.promises.writeFile(this.route, JSON.stringify(carts, null, 2), 'utf-8')
            return carts
        } 
        catch (error) {
            return console.log("No se pudo crear el carrito");
        }
    }

    getCartById = async ( cartID ) => {
        let carts = await this.readCartFile()
        let cartFound = carts.find(cart => cart.id.toString() === cartID)
        if (!cartFound) {
            return console.log("No se encontró el carrito con esa ID");
        }

        return(cartFound)
    }

    addProductToCart = async ( cartID , prodID ) => {
        try {
            let carts = await this.readCartFile()
            const indexCart = carts.findIndex(cart => cart.id.toString() === cartID)
            if (indexCart === -1) {
                return console.log("No existe el carrito.");
            }
            const indexProduct = carts[indexCart].products.findIndex(product => product.id.toString() === prodID)
            if (indexProduct === -1) {
                carts[indexCart].products.push({id: parseInt(prodID), quantity: 1})
            }
            else {
                carts[indexCart].products[indexProduct].quantity++;
            }

            await fs.promises.writeFile(this.route, JSON.stringify( carts , null , 2 ) , 'utf-8')
            return carts
        } 
        catch (error) {
            return console.log("No se pudo crear el carrito")
        }
    }
}

module.exports = {
    CartManager
}