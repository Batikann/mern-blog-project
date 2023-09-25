import express from 'express'
import { createPost, getPosts } from '../controller/post.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/createpost', verifyToken, createPost)
router.get('/getposts', getPosts)

export default router
