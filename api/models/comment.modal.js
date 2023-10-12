import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
