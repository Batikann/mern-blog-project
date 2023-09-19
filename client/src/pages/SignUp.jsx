import { Button, Form, Input, message } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      message.success('Sign Up Successfully!')
      setLoading(false)
      navigate('/sign-in')
    } catch (error) {
      message.error('Sign Up Not Successfull Try Again...')
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col justify-center mt-4 items-center">
      <h2 className="text-2xl font-semibold mb-6">Welcome My Blog</h2>
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
          <Input className="h-12 " placeholder="jhondoe@gmail.com " />
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
          <Input.Password className="h-12 " placeholder="**********" />
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
          <Input.Password className="h-12" placeholder="**********" />
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
          <Input className="h-12" placeholder="jhonDoee" />
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
        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-red-600 hover:!bg-red-500 text-white h-12 font-bold"
            icon={<GoogleOutlined />}
          >
            Login With Google
          </Button>
        </Form.Item>
        <p className="text-base font-medium">
          Have an account ?{' '}
          <Link to="/sign-in" className="text-blue-500 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
