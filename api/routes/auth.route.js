import express from 'express'
import {
  signUp,
  signIn,
  googleSignIn,
  signOut,
} from '../controller/auth.controller.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', googleSignIn)
router.post('/signout', signOut)

export default router
