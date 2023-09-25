import { useState } from 'react'
import { Button, Form, Input, Select, message } from 'antd'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
  const [quillValue, setQuillValue] = useState('')
  const { currentUser } = useSelector((state) => state.user)

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'], // remove formatting button
  ]

  const module = {
    toolbar: toolbarOptions,
  }
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    try {
      await fetch('/api/post/createpost', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          author: currentUser.username,
          email: currentUser.email,
          authorPicture: currentUser.profilePicture,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      message.success('Post Created')
      form.resetFields()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item label="Header" name="header">
        <Input placeholder="Header" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input placeholder="description" />
      </Form.Item>
      <Form.Item label="Cover Image" name="coverImage">
        <Input placeholder="image link" />
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Content" className="mb-6" name="content">
        <ReactQuill
          theme="snow"
          className="h-screen"
          value={quillValue}
          onChange={setQuillValue}
          modules={module}
        />
      </Form.Item>

      <div className="pt-8 flex justify-end">
        <Form.Item>
          <Button
            className="!bg-indigo-800 hover:!bg-indigo-600 text-white font-bold"
            htmlType="submit"
          >
            Create
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
export default CreatePost
