import { Button, Form, Input, Rate, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../components/Comment/CommentBox'
import WriteComment from '../components/Comment/WriteComment'
import PopularPosts from '../components/PopularPosts'

const Post = () => {
  const [post, setPost] = useState()

  const { id } = useParams()
  const getPost = async () => {
    const res = await fetch(`/api/post/getPost/${id}`, {
      method: 'GET',
    })
    const data = await res.json()
    setPost(data[0])
  }
  useEffect(() => {
    getPost()
  }, [])
  console.log(post)
  return post ? (
    <div className="max-w-7xl mx-auto mt-6  w-full h-full min-h-full">
      <div>
        <span className="font-bold bg-indigo-800 text-white p-1 px-4 rounded-xl text-xs cursor-pointer hover:shadow-indigo-600 hover:shadow-md transition-all duration-300">
          {post.category}
        </span>
        <h1 className="text-[45px] font-bold text-slate-600 mb-5">
          {post.header}
        </h1>
        <p className="text-2xl  text-black">{post.description}</p>
      </div>
      <div className="mt-3 flex items-center gap-x-4">
        <img
          src={post.authorPicture}
          alt="post"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p>{post.author}</p>
          <p>
            <span className="mr-2">Published Date:</span>
            {post.createdAt.substring(0, 10).split('-').reverse().join('-')}
          </p>
        </div>
      </div>
      <div className="flex mt-6 justify-between w-full mb-12">
        <div>
          <img
            src={`http://localhost:3000/assets/${post.postCover}`}
            alt="cover-image"
            className="h-[500px] w-full rounded-lg object-cover  "
          />
          <p
            className="my-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <WriteComment />
          <div className="flex flex-col gap-4 mt-12">
            <Comment post={post} />
          </div>
        </div>
        <PopularPosts post={post} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <Spin />
    </div>
  )
}
export default Post
