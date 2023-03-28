const fs = require("fs");
const route = "./archivos/productos.json"

class ProductManager {
    constructor(){
        this.route = route
    }
    getProducts = async () => {
        try {
            if (fs.existsSync(this.route)) {
                const products = await fs.promises.readFile(this.route)
                return JSON.parse(products);
            }
            return []
        } 
        catch (err) {
            return []
        }
    }

    addProduct = async ( product ) => {
        const products = await this.getProducts()

        if (products.length === 0) {
            product.id = 1;
        }
        else {
            product.id = products[products.length-1].id + 1;
        }
        
        products.push(product);
        await fs.promises.writeFile(this.route,JSON.stringify(products));
        return products;
    }


    getProductsById = async ( id ) => {
        const products = await this.getProducts();

        let productFound = products.find(product => product.id.toString() === id)
        if (productFound){
            return productFound
        }
        console.log("producto no encontrado");
    }

    deleteProductsById = async ( id ) => {
        const products = await this.getProducts();

        let productFound = products.find(product => product.id.toString() === id)
        let position = products.indexOf(productFound)

        if(position === -1) {
            return console.log("No se encontró un producto con esa ID");
        }

        products.splice(position,1)
        await fs.promises.writeFile(this.route,JSON.stringify(products));
        return products;
    }
}

module.exports = {
    ProductManager
}