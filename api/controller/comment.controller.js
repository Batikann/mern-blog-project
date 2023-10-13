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

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) next(errorHandler('401', 'Comment Not Found'))
    await Comment.deleteOne({ _id: req.params.id })
    res.status(200).json('Comment Deleted Successfully')
  } catch (error) {
    next(error)
  }
}

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) next(errorHandler('401', 'Comment Not Found'))
    await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}
