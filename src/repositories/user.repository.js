class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    async get() {
        return await this.dao.get()
    }
    async getByName( name ) {
        return await this.dao.getByName( name )
    }
    async getByUsername( username ) {
        return await this.dao.getByUsername( username )
    }
    async create( content ) {
        return await this.dao.create( content )
    }
    async update( name , content ) {
        return await this.dao.update( name , content )
    }
    async delete( username ) {
        return await this.dao.delete( username )
    }
}

module.exports = UserRepository