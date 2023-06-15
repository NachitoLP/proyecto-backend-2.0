exports.generateUserErrorInfo = (user) => {
    return `
        Una o más propiedades están incompletas, no es válido.
        Lista de propiedades requeridas:
        - first_name: Necesita ser un string, y se recibió ${user.first_name}.
        - last_name: Necesita ser un string, y se recibió ${user.last_name}.
        - email: Necesita ser un string email, y se recibió ${user.email}.
    `
}

exports.generateProductErrorInfo1 = (product) => {
    return `
        Una o más propiedades están incompletas, no es válido.
        Lista de propiedades requeridas:
        - title: Necesita ser un string, y se recibió ${product.title}.
        - price: Necesita ser un número, y se recibió ${product.price}.
        - description: Necesita ser un string, y se recibió ${product.description}.
        - stock: Necesita ser un número, y se recibió ${product.stock}.
        - department: Necesita ser un string, y se recibió ${product.department}.
    `
}

exports.generateProductErrorInfo2 = (product) => {
    return `
        Una o más propiedades están incorrectas, no es válido.
        Lista de propiedades requeridas:
        - title: Necesita ser un string, y se recibió ${product.title}.
        - price: Necesita ser un número, y se recibió ${product.price}.
        - description: Necesita ser un string, y se recibió ${product.description}.
        - stock: Necesita ser un número, y se recibió ${product.stock}.
        - department: Necesita ser un string, y se recibió ${product.department}.
    `
}

exports.generateBuyErrorInfo = (product) => {
    return `
        No se puede realizar la compra debido a que ${product} no cuenta con más stock disponible.
        Pruebe a eliminar el producto del carrito para continuar con la compra.
    `
}