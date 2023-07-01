class OrderRepository {
    constructor(dao) {
        this.dao = dao
    }

    async get() {
        return await this.dao.get({})
    }
    async getById( oid ) {
        return await this.dao.getById( oid )
    }
    async create( content ) {
        return await this.dao.create( content )
    }
    async update( oid , content ) {
        return await this.dao.update( oid , content )
    }
    async delete( oid ) {
        return await this.dao.delete( oid )
    }
}

module.exports = OrderRepository