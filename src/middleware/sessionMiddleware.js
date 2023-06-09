let midSession = function (req , res , next)  {
    try {
        if (!req.session.user) {
            return res.redirect('/session/login')
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

let midAdmin = function (req , res , next) {
    try {
        if (req.session.user.rol != "admin") {
            return res.status(401).send({status: 'error', message: 'Debés ser administrador para realizar esta acción.'})
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    midSession,
    midAdmin
}