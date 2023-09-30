import express from 'express'
import { verifyToken } from '../middleware/verifyUser.js'
import { updateUser, getAllUsers } from '../controller/user.controller.js'

const router = express.Router()

router.get('/')
router.post('/update/:id', verifyToken, updateUser)
router.get('/all', verifyToken, getAllUsers)
export default router
