import express from 'express'
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
} from '../controller/category.controller.js'
import { checkRole } from '../middleware/checkUserRole.js'

const router = express.Router()

router.post('/create-category', checkRole, createCategory)
router.get('/get-categories', getCategories)
router.delete('/delete-category/:id', checkRole, deleteCategory)
router.put('/update-category/:id', checkRole, updateCategory)
router.get('/get-category/:id', checkRole, getCategory)

export default router
