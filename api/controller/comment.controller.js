import { errorHandler } from '../middleware/errorHandler.js'
import Comment from '../models/comment.modal.js'

export const createComment = async (req, res, next) => {
  const { postID, username, avatar, commentText, rate, userID } = req.body
  try {
    const newComment = new Comment({
      postID,
      username,
      avatar,
      commentText,
      rate,
      userID,
    })
    await newComment.save()
    res.status(200).json(newComment)
  } catch (error) {
    next(error)
  }
}

export const getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postID: { $in: req.params.id } })
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
