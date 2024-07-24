const jwt = require('jsonwebtoken')
const {  UnauthenticatedError   } = require('../errors')

const authenticationMiddleware  = async(req,res,next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No  Token provided')  // 401 authentication error
    }

    //authHeader = 'bearer <token>'
    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //{ id: 23, username: 'sam', iat: 1721778460, exp: 1724370460 }
        const {id, username} = decoded
        req.user = { id, username}
        next()
        
    } catch (error) {
        //errors like token expired etc
        throw new UnauthenticatedError('Not authorized to  access this route')
    }

}

module.exports = authenticationMiddleware