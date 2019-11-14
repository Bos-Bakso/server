const { decodeToken } = require('../helper/jwt')

const authentication = (req,res,next) => {
    try {
        req.loggedUser = decodeToken(req.headers.token, process.env.SALT)
        next()
    }
    catch {
        next({ name: 'AuthenticationError'})
    }
}

const authorization = (req,res,next) => {
    const user = req.loggedUser
    if(user.isOwner)next()
    else next({name : 'AuthorizationError'})
}

module.exports = {
    authentication,
    authorization
}