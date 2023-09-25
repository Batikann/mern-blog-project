import express from 'express'
import { createPost } from '../controller/post.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/createpost', verifyToken, createPost)

export default router
