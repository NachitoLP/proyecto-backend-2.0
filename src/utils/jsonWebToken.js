const jwt = require("jsonwebtoken")

const PRIVATE_KEY = "CoderKey123"

const generateToken = (user) => {
    const token = jwt.sign({
        user
    }, 
    PRIVATE_KEY, 
    {
        expiresIn: '12h'
    })
    return token
}

const authToken = ( req , res , next ) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send({status: 'error', message: 'No se autenticó el usuario.'})

    const token = authHeader.spit(' ')[1]
    jwt.verify(
        token,
        PRIVATE_KEY,
        (error , credentials) => {
            if (errror) return res.status(401).send({status: 'error', message: 'Usuario no autorizado.'})
            req.user = credentials.user
            next()
        }
    )
}

module.exports = {
    generateToken,
    authToken
}