import { useSelector } from 'react-redux'
import { Button, Form, Input, Progress, message } from 'antd'
import { useRef, useState, useEffect } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../config/firebase'
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const loading = useSelector((state) => state.user.loading)
  const [imagePercent, setImagePercent] = useState(0)
  const [image, setImage] = useState(undefined)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const fileRef = useRef()
  const [form] = Form.useForm()
  console.log(formData)

  const onFinish = (values) => {
    console.log(values)
  }

  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        )
      }
    )
  }
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  return (
    <div className="flex flex-col gap-4  items-center">
      <h2 className="text-2xl font-bold mt-6">Profile</h2>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <img
        src={currentUser.profilePicture}
        alt={currentUser.username}
        className="w-20 h-20 object-cover rounded-full"
        onClick={() => fileRef.current.click()}
      />
      <p className="text-sm self-center">
        {imageError ? (
          <span className="text-red-700">
            Error uploading image (file size must be less than 2 MB)
          </span>
        ) : imagePercent > 0 && imagePercent < 100 ? (
          <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
        ) : imagePercent === 100 ? (
          <span className="text-green-700">Image uploaded successfully</span>
        ) : (
          ''
        )}
      </p>
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
        </div>
      </Form>
    </div>
  )
}

export default Profile
