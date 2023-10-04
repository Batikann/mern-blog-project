import bcryptjs from 'bcryptjs'
import User from '../models/user.modal.js'
import { errorHandler } from '../middleware/errorHandler.js'

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'))
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(
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
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    const filteredUsers = users.map((user) => {
      const { password, ...rest } = user._doc
      return rest
    })
    res.status(200).json(filteredUsers)
  } catch (error) {
    next(error)
  }
}

export const changeUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return next(errorHandler(404, 'User Not Found!'))
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updateUser)
  } catch (error) {
    next(error)
  }
}

export const changeRoleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return next(errorHandler(404, 'User Not Found!'))
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updateUser)
  } catch (error) {
    next(error)
  }
}
