import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space, Button, message } from 'antd'
import { signOut } from '../redux/user/userSlice'

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      fetch('/api/auth/signout', {
        method: 'POST',
      })

      message.success('Logout successfully')
      dispatch(signOut())
    } catch (error) {
      message.error(error.message)
    }
  }
  const items = [
    currentUser?.role === 'admin'
      ? {
          label: (
            <Link to="/admin" className="text-sm">
              {currentUser?.username}
            </Link>
          ),
          key: '0',
        }
      : {
          label: (
            <Link to="/profile" className="text-sm">
              {currentUser?.username}
            </Link>
          ),
          key: '0',
        },
    {
      type: 'divider',
    },
    {
      label: (
        <Button htmlType="submit" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      ),
      key: '1',
    },
  ]
  return (
    <div className="bg-white mx-auto p-4 flex justify-between fixed top-0 left-0 z-50 w-full items-center border-b">
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
