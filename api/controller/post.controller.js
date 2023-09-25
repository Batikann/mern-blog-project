import Post from '../models/post.modal.js'

export const createPost = async (req, res, next) => {
  const {
    author,
    email,
    authorPicture,
    content,
    coverImage,
    category,
    description,
    header,
  } = req.body
  try {
    const newPost = new Post({
      author,
      email,
      authorPicture,
      content,
      coverImage,
      category,
      description,
      header,
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
