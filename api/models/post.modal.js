import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    authorPicture: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
    postCover: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
