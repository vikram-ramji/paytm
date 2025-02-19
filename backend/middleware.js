const jwt = require('jsonwebtoken')
const JWT_SECRET = require("./config")

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) {
        return res.status(403).json({})
    }
    const token = header.split(' ')[1]
    
    try {
        const decoded_token = jwt.verify(token, JWT_SECRET)
        req.userId = decoded_token.userId
        next()
    } catch (err) {
        return res.status(403).json({})
    }
}

module.exports = { authMiddleware }