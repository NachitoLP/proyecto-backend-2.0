const jwt = require("jsonwebtoken")
const { objConfig } = require("../config/config")

const PRIVATE_KEY = objConfig.private_key

const generateToken = (user) => {
    const token = jwt.sign({
        user
    }, 
    PRIVATE_KEY, 
    {
        expiresIn: '1h'
    })
    return token
}

const jwtStatus = (req , res) => {
    const {token} = req.params
    jwt.verify(token, PRIVATE_KEY , (error) => {
        if (error) return res.status(401).send({status: 'error', message: 'Link expirado.'})
        else {
            res.render('new_login')
        }
    })
}

const authToken = ( req , res , next ) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send({status: 'error', message: 'No se autenticó el usuario.'})

    const token = authHeader.spit(' ')[1]
    jwt.verify(
        token,
        PRIVATE_KEY,
        (error , credentials) => {
            if (error) return res.status(401).send({status: 'error', message: 'Usuario no autorizado.'})
            req.user = credentials.user
            next()
        }
    )
}

module.exports = {
    generateToken,
    authToken,
    jwtStatus
}