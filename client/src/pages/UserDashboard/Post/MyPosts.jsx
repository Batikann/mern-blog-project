import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MyPosts = () => {
  const [posts, setPosts] = useState()
  const { currentUser } = useSelector((state) => state.user)

  const getPostsUser = async () => {
    const res = await fetch(`/api/post/getpostsForUser/${currentUser._id}`, {
      method: 'GET',
    })
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    getPostsUser()
  }, [])

  const columns = [
    {
      title: 'image',
      dataIndex: 'postCover',
      key: 'postCover',
      width: '25%',

      render: (text, record) => {
        return (
          <div className="flex justify-center items-center">
            <img
              className="object-contain "
              src={`http://localhost:3000/assets/${record.postCover}`}
            />
          </div>
        )
      },
    },
    {
      title: 'Header',
      dataIndex: 'header',
      key: 'header',
      width: '20%',
      render: (text, record) => {
        return <h2 className=" font-semibold">{record.header}</h2>
      },
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
      return: (text, record) => {
        return <p className="text-lg">{record.description}</p>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <div className="flex gap-4 justify-center items-center">
            <Link to={`/profile/posts/view-post/${record._id}`}>View</Link>
            <p>Delete</p>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-4 justify-end flex">
        <Link
          className="bg-indigo-800 hover:bg-indigo-600 text-white font-bold p-2 rounded-md"
          to="/profile/posts/create-post"
        >
          Create Post
        </Link>
      </div>
      <Table dataSource={posts} columns={columns} rowKey={'_id'} />
    </>
  )
}
export default MyPosts
