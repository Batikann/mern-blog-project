import { Button, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    dispatch(signInStart())
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure())
        return
      }
      dispatch(signInSuccess(data))
      message.success('Sign In Successfully!')
      navigate('/')
    } catch (error) {
      message.error('Sign In Not Successfull Try Again...')
      dispatch(signInFailure())
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col justify-center mt-4 items-center">
      <h2 className="text-2xl font-semibold mb-6">Welcome My Blog Login</h2>
      <Form
        form={form}
        layout="vertical"
        name="register"
        onFinish={onFinish}
        className="md:min-w-[600px] p-4 max-[540px]:w-full"
      >
        <Form.Item
          className="w-full"
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            className="h-12 "
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="jhondoe@gmail.com "
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            className="h-12 "
            placeholder="**********"
          />
        </Form.Item>
        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-indigo-800 hover:!bg-indigo-500 text-white h-12 font-bold"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
        <OAuth />
        <p className="text-base font-medium">
          Don't Have an account ?
          <Link
            to="/sign-up"
            className="text-blue-500 hover:text-blue-300 ml-2"
          >
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignIn
