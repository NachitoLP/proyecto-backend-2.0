class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    async get() {
        return await this.dao.get({})
    }
    async getById( pid ) {
        return await this.dao.getById( pid )
    }
    async create( content ) {
        return await this.dao.create( content )
    }
    async update( pid , content ) {
        return await this.dao.update( pid , content )
    }
    async delete( pid ) {
        return await this.dao.delete( pid )
    }
}

module.exports = ProductRepository