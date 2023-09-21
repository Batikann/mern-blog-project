import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space, Button } from 'antd'

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const handleLogout = () => {}
  const items = [
    {
      label: <p className="text-sm">{currentUser?.username}</p>,
      key: '0',
    },
    {
      label: <Link to="/">Home</Link>,
      key: '1',
    },
    {
      label: <Link to="/profile">Profile</Link>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Button className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      ),
      key: '3',
    },
  ]
  return (
    <div className="w-full p-4 flex justify-between items-center border-b">
      <Link to="/">
        <h1 className="font-bold text-xl">MERN Blog Project</h1>
      </Link>
      <div className="flex gap-x-3 font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUser ? (
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <div
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={currentUser?.profilePicture}
                alt={currentUser?.username}
                className="w-9 h-9 object-cover rounded-full"
              />
              <DownOutlined />
            </div>
          </Dropdown>
        ) : (
          <Link to="/sign-in">Sign In</Link>
        )}
      </div>
    </div>
  )
}
