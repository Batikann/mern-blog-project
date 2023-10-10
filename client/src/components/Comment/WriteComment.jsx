import { Button, Form, Input, Rate } from 'antd'
import { CommentOutlined } from '@ant-design/icons'

const WriteComment = () => {
  return (
    <div>
      <div className="flex gap-x-4 mb-4 items-center">
        <CommentOutlined className="text-3xl" />
        <h3>Yorum Yaz</h3>
      </div>
      <Form>
        <Form.Item>
          <Input.TextArea
            className='"w-full h-[200px] rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent p-2'
            placeholder="add comment..."
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Rate />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button>Yorum Yaz</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default WriteComment