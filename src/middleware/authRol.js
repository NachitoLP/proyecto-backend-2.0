const authRol = (rol) => {
    return async (req , res , next) => {
        if (req.session.user.rol !== rol) {
            return res.status(401).json({
                status: "Error",
                error: "No tenés permisos."
            })
        }
        next()
    }
} 

module.exports = authRol