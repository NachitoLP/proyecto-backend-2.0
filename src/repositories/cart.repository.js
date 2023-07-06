class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    async get() {
        return await this.dao.get()
    }
    async getById( cid , username ) {
        return await this.dao.getById( cid , username )
    }
    async create( content ) {
        return await this.dao.create( content )
    }
    async update( cid , pid  ) {
        return await this.dao.addToCart( cid , pid )
    }
    async delete( cid ) {
        return await this.dao.delete( cid )
    }
    async deleteInCart( cid , pid ) {
        return await this.dao.deleteInCart( cid , pid )
    }
}

module.exports = CartRepository