import express from 'express'
import { verifyToken } from '../middleware/verifyUser.js'
import {
  updateUser,
  getAllUsers,
  changeUserStatus,
} from '../controller/user.controller.js'

const router = express.Router()

router.get('/')
router.post('/update/:id', verifyToken, updateUser)
router.get('/all', verifyToken, getAllUsers)
router.post('/changeUserStatus/:id', changeUserStatus)
export default router
