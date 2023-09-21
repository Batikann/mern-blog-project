import express from 'express'
import { verifyToken } from '../middleware/verifyUser.js'
import { updateUser } from '../controller/user.controller.js'

const router = express.Router()

router.get('/')
router.post('/update/:id', verifyToken, updateUser)
export default router
