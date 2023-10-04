import { errorHandler } from '../middleware/errorHandler.js'
import jwt from 'jsonwebtoken'

export const checkRole = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(errorHandler(401, 'you are  Not Authenticated'))
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, 'Invalid Token'))
    }
    req.user = user
    if (req.user.role !== 'admin') {
      return next(errorHandler(403, 'You are not an admin'))
    }
    next()
  })
}
