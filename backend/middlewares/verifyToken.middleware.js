const jwt = require('jsonwebtoken')

const verifyToken = async (request, response, next) => {
  if (!request.headers.authorization)
    return response.status(403).json({ message: 'Not authorized. No token' })

  if (request.headers.authorization.startsWith('Bearer ')) {
    const token = request.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => { //! data is a payload

      if (err) return response.status(403).json({ message: 'Wrong or expired token' })
      else {
        request.user = data //! an object with only the user.id and user.isAdmin
        next()
      }

    })
  }
}

const verifyTokenAdmin = async (request, response, next) => {
  if (!request.headers.authorization)
    return response.status(403).json({ message: 'Not authorized. No token' })

  if (request.headers.authorization.startsWith('Bearer ')) {
    const token = request.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => { //! data is a payload

      if (err) return response.status(403).json({ message: 'Wrong or expired token' })
      else {
        if (!data.isAdmin) {
          return response.status(401).json({ message: "You're not admin" })
        }
        request.user = data //! an object with only the user.id and user.isAdmin
        next()
      }

    })
  }
}

module.exports = {
  verifyToken, 
  verifyTokenAdmin
}