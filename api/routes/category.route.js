import express from 'express'
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../controller/category.controller.js'

const router = express.Router()

router.post('/create-category', createCategory)
router.get('/get-categories', getCategories)
router.delete('/delete-category/:id', deleteCategory)
router.patch('/update-category/:id', updateCategory)

export default router
