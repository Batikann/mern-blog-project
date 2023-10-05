import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  EditOutlined,
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
              icon: <EditOutlined />,
              label: <Link to="/profile/edit">Edit Profile</Link>,
            },
            {
              key: '2',
              icon: <BookOutlined />,
              label: <Link to="/profile/posts">My Posts</Link>,
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
