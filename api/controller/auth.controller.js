import User from '../models/user.modal.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const validUser = await User.findOne({ email })
    if (!validUser) res.status(404).json({ message: 'Invalid credentials' })
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) res.status(401).json({ message: 'Invalid Password' })
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: hashedPassword, ...rest } = validUser._doc
    const expiryDate = new Date(Date.now() + 3600) // 1 Hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
