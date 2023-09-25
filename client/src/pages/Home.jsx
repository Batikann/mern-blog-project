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
              extra={<img width={272} alt="logo" src={item.coverImage} />}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="flex items-center justify-center"
                    src={item.authorPicture}
                  />
                }
                title={<a href={item.href}>{item.title}</a>}
                description={item.header}
              />

              <Rate disabled value={item.rate} />
              <div>{item.description}</div>
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
