import express from 'express'
import { verifyToken } from '../middleware/verifyUser.js'
import { checkRole } from '../middleware/checkUserRole.js'
import {
  updateUser,
  getAllUsers,
  changeUserStatus,
  changeRoleUser,
} from '../controller/user.controller.js'

const router = express.Router()

router.get('/')
router.post('/update/:id', verifyToken, updateUser)
router.get('/all', verifyToken, checkRole, getAllUsers)
router.post('/changeUserStatus/:id', checkRole, changeUserStatus)
router.put('/changeUserRole/:id', checkRole, changeRoleUser)
export default router
