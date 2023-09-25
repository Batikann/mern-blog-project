import { useState } from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
  const [quillValue, setQuillValue] = useState('')
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

  return (
    <Form layout="vertical">
      <Form.Item label="Cover Image">
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item label="Content">
        <ReactQuill
          theme="snow"
          className="h-screen"
          value={quillValue}
          onChange={setQuillValue}
          modules={module}
        />
      </Form.Item>
    </Form>
  )
}
export default CreatePost
