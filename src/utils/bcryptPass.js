const bcrypt = require("bcrypt")

salt = 10

const createHashedPass = (password) => bcrypt.hashSync(password , bcrypt.genSaltSync(salt))

const checkValidPassword = ({password , hashedPassword}) => bcrypt.compareSync(password , hashedPassword)

module.exports = {
    createHashedPass,
    checkValidPassword
}