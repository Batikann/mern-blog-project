import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  TwitterOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinFilled,
  YoutubeFilled,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Avatar, List, Rate } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

const Home = () => {
  const [posts, setPost] = useState([])
  const getPosts = async () => {
    const res = await fetch('/api/post/getPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    setPost(data) // set data to state
  }
  useEffect(() => {
    getPosts()
  }, [posts])

  return (
    <>
      <div className="w-full py-8 px-4 home h-full mt-12 ">
        <div className="max-w-7xl mx-auto h-full">
          <List
            itemLayout="vertical"
            size="large"
            pagination={
              posts.length > 3 && {
                onChange: (page) => {
                  console.log(page)
                },
                pageSize: 4,
              }
            }
            dataSource={posts}
            footer={null}
            renderItem={(item) => (
              <Link to={`/post/${item._id}`}>
                <List.Item
                  extra={
                    <img
                      width={272}
                      height={153}
                      alt="post"
                      src={`http://localhost:3000/assets/${item.postCover}`}
                    />
                  }
                >
                  <List.Item.Meta
                    title={<p>{item.title}</p>}
                    description={
                      <p className="text-xl font-bold text-black">
                        {item.header}
                      </p>
                    }
                  />
                  <div className="my-2">
                    <Avatar src={item.authorPicture} />
                    <span className="ml-2">{item.author}</span>
                  </div>
                  <div>{item.description}</div>
                  <Rate disabled value={item.rate} className="my-2" />
                  <p className="mt-2">{item.createdAt.substring(0, 10)}</p>
                </List.Item>
              </Link>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default Home
