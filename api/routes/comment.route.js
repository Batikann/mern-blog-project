import express from 'express'
import {
  createComment,
  getCommentsForPost,
  deleteComment,
  updateComment,
} from '../controller/comment.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/create-comment', verifyToken, createComment)
router.get('/get-commentsPost/:id', getCommentsForPost)
router.delete('/delete-comment/:id', verifyToken, deleteComment)
router.put('/update-comment/:id', verifyToken, updateComment)

export default router
