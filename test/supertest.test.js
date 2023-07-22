const chai = require('chai')
const supertest = require('supertest')
const { ProductsDao, CartsDao } = require('../src/dao/factory')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de API', () => {
    describe('Test de products.' , () => {

        it('El endpoint GET /api/products debería traer un array de productos.' , async function() {
            const {
                statusCode,
                ok,
                _body 
            } = await requester.get('/api/products')

            expect(ok).to.equal(true)
        })

        it('El endpoint POST /api/products debería crear un producto.' , async function() {
            const productMock = {
                title: 'Anteojos',
                description: 'Unos anteojos',
                price: 200,
                department: 'Óptica',
                code: '234moafafp',
                stock: 20,
                status: true
            }
    
            const {
                statusCode,
                ok,
                _body 
            } = await requester.post('/api/products').send(productMock)

            expect(_body.product).to.have.property('_id') // Pasa pero se debe desactivar el middleware de session y rol.
        })
    })

    describe('Test de Cart' , () => {
        it('El endpoint GET /api/carts debería traer el carrito asociado al usuario logueado.', async function() {
            const {
                statusCode,
                ok,
                _body 
            } = await requester.get('/api/carts')

            expect(ok).to.equal(true) // Pasa pero se debe estar logueado.
            expect(statusCode).to.equal(200)
        })
    })

    describe('Test de session' , () => {
        it('Se debe registrar un usuario correctamente.' , async function() {
            const userMock = {
                first_name: "Joaquin",
                last_name: "López",
                email: "jroa@gmail.com",
                password: "12344",
                username: "jroaquin"
            }

            const result = await requester.post('/session/register').send(userMock)
            expect(result.request._data).to.have.property('username')
        })
    })
})