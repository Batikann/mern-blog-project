import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const { Header, Sider, Content } = Layout
const Profile = () => {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { currentUser } = useSelector((state) => state.user)

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        collapsedWidth={100}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="vertical"
          style={{ minHeight: '100vh' }}
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to="/profile/edit">Edit Profile</Link>,
            },
            {
              key: '2',
              icon: <BookOutlined />,
              label: <Link to="/profile/posts">My Posts</Link>,
            },
            currentUser.role === 'admin' && {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link to="/profile/category">Category</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Profile
