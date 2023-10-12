import express from 'express'
import {
  createComment,
  getCommentsForPost,
} from '../controller/comment.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/create-comment', verifyToken, createComment)
router.get('/get-commentsPost/:id', getCommentsForPost)

export default router
