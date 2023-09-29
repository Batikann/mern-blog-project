import { errorHandler } from '../middleware/errorHandler.js'
import Category from '../models/category.modal.js'

export const createCategory = async (req, res, next) => {
  const { categoryName } = req.body
  try {
    const newCategory = new Category({ categoryName })
    await newCategory.save()
    res.status(200).json(newCategory)
  } catch (error) {
    next(error)
  }
}

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) return next(errorHandler(401, 'Category Not Found'))
    await Category.deleteOne({ _id: req.params.id })
    res.status(200).json('Category Deleted Successfully')
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) return next(errorHandler(401, 'Category Not Found'))
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updateCategory)
  } catch (error) {
    next(error)
  }
}
