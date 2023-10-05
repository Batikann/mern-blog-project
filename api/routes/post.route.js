import express from 'express'
import {
  getPosts,
  getPostsForUser,
  getPostById,
} from '../controller/post.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.get('/getposts', getPosts)
router.get('/getpostsForUser/:id', verifyToken, getPostsForUser)
router.get('/getpost/:id', verifyToken, getPostById)

export default router
