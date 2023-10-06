import Post from '../models/post.modal.js'
import { errorHandler } from '../middleware/errorHandler.js'

export const createPost = async (req, res, next) => {
  const {
    author,
    email,
    authorPicture,
    content,
    postCover,
    category,
    description,
    header,
    authorID,
  } = req.body
  try {
    const newPost = new Post({
      author,
      email,
      authorPicture,
      content,
      postCover,
      category,
      description,
      header,
      authorID,
    })
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    next(error)
  }
}

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPostsForUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ authorID: req.params.id })
    if (!posts) return next(errorHandler(404, 'Posts not found'))
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.find({ _id: req.params.id })
    if (!post) return next(errorHandler(404, 'Post not found'))
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return next(errorHandler(404, 'Post not found'))
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatePost)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return next(errorHandler(404, 'Post not found'))
    await Post.deleteOne({ _id: req.params.id })
    res.status(200).json('Post deleted successfully')
  } catch (error) {
    next(error)
  }
}
