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
import CategoryMenu from '../components/CategoryMenu'
import { Footer } from 'antd/es/layout/layout'

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
      <div className="w-full py-8 px-4 home h-screen ">
        <div className="max-w-7xl mx-auto h-screen">
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
            )}
          />
        </div>
        <Footer
          style={{
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          <div>
            <ul className="text-xl flex gap-4 w-full justify-center">
              <li className="text-blue-600 hover:text-blue-400 cursor-pointer transition-all">
                <TwitterOutlined />
              </li>
              <li className="text-blue-600 hover:text-blue-400 cursor-pointer transition-all">
                <LinkedinFilled />
              </li>
              <li className="text-fuchsia-700 hover:text-fuchsia-500 cursor-pointer">
                <InstagramOutlined />
              </li>
              <li className="text-slate-600 cursor-pointer hover:text-slate-500">
                <GithubOutlined />
              </li>
              <li className="text-red-600 cursor-pointer transition-all hover:text-red-500 ">
                <YoutubeFilled />
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <ul className="flex gap-4 font-semibold w-full justify-center">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Need Help?</a>
              </li>
              <li>
                <a href="#">Content Guide </a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms Of Use</a>
              </li>
            </ul>
          </div>
        </Footer>
      </div>
    </>
  )
}

export default Home
