class UserDto {
    constructor(user){
        this.full_name = `${user.first_name} ${user.last_name}`,
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.username = user.username,
        this.email = user.email,
        this.password = user.password,
        this.rol = user.rol
    }

}

module.exports = {
    UserDto
}