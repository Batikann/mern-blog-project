import express from 'express'
import {
  getPosts,
  getPostsForUser,
  getPostById,
  deletePost,
  updatePost,
} from '../controller/post.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.get('/getposts', getPosts)
router.get('/getpostsForUser/:id', verifyToken, getPostsForUser)
router.get('/getpost/:id', verifyToken, getPostById)
router.delete('/delete-post/:id', verifyToken, deletePost)

export default router
