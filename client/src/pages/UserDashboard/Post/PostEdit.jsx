import {
  DeleteOutlined,
  EditOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Form, Button, Input, Select, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const PostEdit = ({ post, categories, form, id }) => {
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
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const formData = new FormData()

    formData.append('header', values.header)
    formData.append('description', values.description)
    formData.append('content', values.content)
    formData.append('category', values.category)
    if (image) {
      formData.append('picture', image)
      formData.append('postCover', image.name)
    } else {
      formData.append('postCover', post.postCover)
    }
    formData.append('author', currentUser.username)
    formData.append('email', currentUser.email)
    formData.append('authorPicture', currentUser.profilePicture)
    formData.append('authorID', currentUser._id)
    try {
      const res = await fetch(`http://localhost:3000/post/${id}`, {
        method: 'PUT',
        body: formData,
      })
      if (res.status === 200) {
        message.success('Post updated')
        navigate('/profile/posts')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form
      layout="vertical"
      className="flex flex-col gap-6"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        label="Header"
        name="header"
        rules={[{ required: true, max: 50, min: 15 }]}
      >
        <Input placeholder="Header" className="h-12" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, min: 50, max: 100 }]}
      >
        <Input placeholder="description" className="h-12" />
      </Form.Item>
      <Form.Item label="Cover Image" rules={[{ required: true }]}>
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="flex border-2 border-dashed p-4 w-full justify-center items-center cursor-pointer">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!image ? (
                  <div className="text-center ">
                    <CloudUploadOutlined className="text-2xl" />
                    <p className="mt-1 font-semibold">Add Image Here</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="mr-5">{image.name}</p>
                    <div className="hover:text-indigo-700 cursor-pointer text-lg">
                      <EditOutlined />
                    </div>
                  </div>
                )}
              </div>
              {image && (
                <div
                  onClick={() => setImage(null)}
                  className="ml-4 cursor-pointer hover:text-indigo-700 text-lg"
                >
                  <DeleteOutlined />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Select className="h-12" placeholder="Select to category">
          {categories.map((category) => (
            <Select.Option value={category.id} key={category._id}>
              {category.categoryName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Content"
        className="mb-6"
        name="content"
        rules={[{ required: true }]}
      >
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
            Update Post
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
export default PostEdit
