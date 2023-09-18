import User from '../models/user.modal.js'
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(200).json({ message: 'User created Successfully !' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
