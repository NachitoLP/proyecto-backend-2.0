const { faker } = require('@faker-js/faker')

faker.locale = 'es'

exports.generateProducts = () => {
    let product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        href: "Sin imagen",
        code: faker.random.alphaNumeric(5),
        stock: faker.random.numeric(1),
        status: true
    }
    return product
}