const mongoose = require("mongoose")
const chai = require("chai")
const { objConfig } = require("../src/config/config")
const { ProductsDao } = require("../src/dao/factory")
const { logger } = require("../src/utils/logger")

mongoose.connect(objConfig.mongoURL)

const expect = chai.expect

describe('Testing de ProductsDao con CHAI', () => {
    before(function() {
        this.productDao = new ProductsDao()
    })

    /* beforeEach(function() {
        mongoose.connection.collections.products.drop()
    }) */

    it('El Dao debe obtener un objeto de todos los productos en la base', async function(){
        const result = await this.productDao.get()
        expect(typeof result).to.be.equal('object')
    })
    /* it('El Dao debe agregar un producto en la base', async function(){
        let newProduct = {
            title: 'Anteojos',
            description: 'Unos anteojos',
            price: 200,
            department: 'Óptica',
            code: '234moafafp',
            stock: 20,
            status: true
        }
        const result = await this.productDao.create(newProduct)
        assert.ok(result._id)
        assert.equal(typeof(result), 'object')
    }) */
})