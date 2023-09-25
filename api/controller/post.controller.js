import Post from '../models/post.modal'

export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body)
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    next(error)
  }
}
