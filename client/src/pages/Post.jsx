import { Button, Empty, Form, Input, Rate, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../components/Comment/CommentBox'
import WriteComment from '../components/Comment/WriteComment'
import PopularPosts from '../components/PopularPosts'
import { useSelector } from 'react-redux'

const Post = () => {
  const [post, setPost] = useState()
  const [comments, setComments] = useState()
  const [category, setCategory] = useState()
  const [newComment, setNewComment] = useState()
  const { currentUser } = useSelector((state) => state?.user)

  const { id } = useParams()
  const getPost = async () => {
    const res = await fetch(`/api/post/getPost/${id}`, {
      method: 'GET',
    })
    const data = await res.json()
    await setPost(data[0])
    const categoryRes = await fetch(
      `/api/category/get-category/${data[0].category}`,
      {
        method: 'GET',
      }
    )
    const categoryData = await categoryRes.json()
    setCategory(categoryData)
    const resComments = await fetch(
      `/api/comment/get-commentsPost/${data[0]._id}`,
      {
        method: 'GET',
      }
    )
    const commentsData = await resComments.json()
    await setComments(commentsData)
  }

  useEffect(() => {
    getPost()
  }, [newComment])

  return post && category ? (
    <div className="max-w-7xl mx-auto w-full h-full min-h-full mt-24 p-4">
      <div>
        <span className="font-bold bg-indigo-800 text-white p-1 px-4 rounded-xl text-sm cursor-pointer hover:shadow-indigo-600 hover:shadow-md transition-all duration-300">
          {category?.categoryName}
        </span>
        <h1 className="lg:text-[45px] text-3xl mt-4  font-bold text-slate-600 mb-5">
          {post.header}
        </h1>
        <p className="lg:text-2xl text-[18px]  text-black">
          {post.description}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-x-4">
        <img
          src={post.authorPicture}
          alt="post"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p>{post.author}</p>
          <p className="text-base">
            <span className="mr-2 text-sm font-semibold">Published Date:</span>
            {post.createdAt.substring(0, 10).split('-').reverse().join('.')}
          </p>
        </div>
      </div>
      <div className="flex mt-6   mb-12 gap-12 md:flex-row  flex-col">
        <div>
          <img
            src={`http://localhost:3000/assets/${post.postCover}`}
            alt="cover-image"
            className="h-[500px] w-full rounded-lg object-cover  "
          />
          <div
            className="my-12 "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-col gap-4 mt-12">
            <WriteComment
              currentUser={currentUser}
              post={post}
              setNewComment={setNewComment}
            />
            <Comment comments={comments} setNewComment={setNewComment} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <PopularPosts post={post} categoryName={category?.categoryName} />
          <PopularPosts post={post} categoryName={category?.categoryName} />
          <PopularPosts post={post} categoryName={category?.categoryName} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <Spin />
    </div>
  )
}
export default Post
