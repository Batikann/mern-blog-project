import bcryptjs from 'bcryptjs'
import User from '../models/user.modal.js'
import { errorHandler } from '../middleware/errorHandler.js'

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, 'You can only update your own account'))
  }
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hashSync(req.body.password, 10)
    }
    const updateUser = User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    )
    const { password, ...rest } = updateUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}
