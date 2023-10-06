import React, { useEffect, useState } from 'react'
import { Table, message, Popconfirm, Button } from 'antd'
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

  const deletePost = async (id) => {
    const res = await fetch(`/api/post/delete-post/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    message.success('Post deleted Successfully')
    if (data) {
      getPostsUser()
    }
  }

  const confirm = (id) => {
    deletePost(id)
  }
  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      render: (text, record) => {
        return <h2 className=" font-semibold">{record.category}</h2>
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
            <Link
              className="!bg-indigo-600 h-[32px] flex text-center items-center justify-center px-4 rounded-md !text-white font-bold !outline-none !border-none hover:!bg-indigo-500 transition-all"
              to={`/profile/posts/view-post/${record._id}`}
            >
              Show
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirm(record._id)}
              placement="topRight"
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="!bg-red-600 !text-white font-bold !outline-none !border-none hover:!bg-red-500 transition-all">
                Delete
              </Button>
            </Popconfirm>
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
