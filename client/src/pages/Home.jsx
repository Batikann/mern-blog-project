import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Avatar, List, Rate } from 'antd'
import CategoryMenu from '../components/CategoryMenu'
import { Footer } from 'antd/es/layout/layout'

const Home = () => {
  const [posts, setPost] = useState()
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
      <div className="w-full py-8 px-4 home h-screen max-w-7xl mx-auto">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 4,
          }}
          dataSource={posts}
          footer={null}
          renderItem={(item) => (
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
                title={<a href={item.href}>{item.title}</a>}
                description={
                  <p className="text-xl font-bold text-black">{item.header}</p>
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
          )}
        />
      </div>
      <Footer style={{ textAlign: 'center', marginTop: '1rem' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </>
  )
}

export default Home
