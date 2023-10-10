import { Button, Form, Input, Rate, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../components/Comment/CommentBox'
import WriteComment from '../components/Comment/WriteComment'
import PopularPosts from '../components/PopularPosts'

const Post = () => {
  const [post, setPost] = useState()
  const [category, setCategory] = useState()

  const { id } = useParams()
  const getPost = async () => {
    const res = await fetch(`/api/post/getPost/${id}`, {
      method: 'GET',
    })
    const data = await res.json()
    setPost(data[0])
  }

  const getCategory = async () => {
    const res = await fetch(`/api/category/get-category/${post.category}`, {
      method: 'GET',
    })
    const data = await res.json()
    setCategory(data)
  }
  useEffect(() => {
    getPost()
  }, [])
  useEffect(() => {
    getCategory()
  }, [post])
  console.log(category)
  return post && category ? (
    <div className="max-w-7xl mx-auto w-full h-full min-h-full xl:mt-24 mt-14 p-4">
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
      <div className="flex mt-6 md:justify-between  mb-12 gap-4 md:flex-row  flex-col">
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

          <div className="flex flex-col gap-4 mt-12">
            <WriteComment />
            <Comment post={post} />
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
