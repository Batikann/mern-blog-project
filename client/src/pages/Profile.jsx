import { useSelector } from 'react-redux'
import { Button, Form, Input, message } from 'antd'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const loading = useSelector((state) => state.user.loading)

  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <div className="flex flex-col gap-4  items-center">
      <h2 className="text-2xl font-bold mt-6">Profile</h2>
      <img
        src={currentUser.profilePicture}
        alt={currentUser.username}
        className="w-20 h-20 object-cover rounded-full"
      />
      <Form
        form={form}
        initialValues={currentUser}
        layout="vertical"
        name="updateProfile"
        onFinish={onFinish}
        className="md:min-w-[600px] p-4 max-[540px]:w-full"
      >
        <Form.Item
          name="username"
          label="Username"
          defaultValue={currentUser.username}
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

        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-indigo-800 hover:!bg-indigo-500 text-white h-12 font-bold"
            loading={loading}
          >
            Update
          </Button>
        </Form.Item>
        <div className="flex justify-between">
          <p className="font-semibold text-base cursor-pointer hover:text-red-600">
            Delete Account
          </p>
          <p className="font-semibold text-base cursor-pointer hover:text-blue-600">
            Sign Out
          </p>
        </div>
      </Form>
    </div>
  )
}

export default Profile
