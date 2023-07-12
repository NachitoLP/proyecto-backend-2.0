const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')


const swaggerOptions = {
    definition: {
        openapi:'3.0.1',
        info: {
            title: "Documentación de la API.",
            description: "Esta es la documentación de la API."
        }
    },
    
    apis: [`${path.resolve(__dirname, '../docs/**/*.yaml')}`]
}

exports.specs = swaggerJsDoc(swaggerOptions)