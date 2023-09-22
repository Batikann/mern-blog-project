import { Form, Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../config/firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log(data)
      navigate('/')
      dispatch(signInSuccess(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form.Item className="w-full">
      <Button
        type="primary"
        onClick={handleGoogleClick}
        htmlType="button"
        className="w-full !bg-red-600 hover:!bg-red-500 text-white h-12 font-bold"
        icon={<GoogleOutlined />}
      >
        Continue With Google
      </Button>
    </Form.Item>
  )
}
export default OAuth
