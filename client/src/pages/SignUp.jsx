import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

const SignUp = () => {
  const loading = useSelector((state) => state.user.loading)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const navigate = useNavigate()
  const onFinish = (values) => {
    dispatch(signInStart())
    try {
      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })

      dispatch(signInFailure())
      message.success('Sign Up Successfully!')
      navigate('/sign-in')
    } catch (error) {
      message.error('Sign Up Not Successfull Try Again...')
      console.log(error)
      dispatch(signInFailure())
    }
  }

  return (
    <div className="flex flex-col justify-center mt-4 items-center">
      <h2 className="text-2xl font-semibold mb-6">Welcome My Blog Register</h2>
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
            {
              min: 8,
              max: 16,
              message: 'Password must be between 8 and 16 characters!',
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.]).*$/,
              message:
                'The password must contain an uppercase letter, a lowercase letter, a digit, and a period!',
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                )
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            className="h-12"
            placeholder="**********"
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="h-12"
            placeholder="jhonDoee"
          />
        </Form.Item>

        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-indigo-800 hover:!bg-indigo-500 text-white h-12 font-bold"
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
        <OAuth />
        <p className="text-base font-medium">
          Have an account ?
          <Link
            to="/sign-in"
            className="text-blue-500 hover:text-blue-300 ml-2"
          >
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
