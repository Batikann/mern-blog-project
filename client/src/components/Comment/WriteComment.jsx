import { Button, Form, Input, Rate } from 'antd'
import { CommentOutlined } from '@ant-design/icons'

const WriteComment = ({ currentUser, post, setNewComment }) => {
  const onFinish = async (values) => {
    const res = await fetch('/api/comment/create-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        username: currentUser.username,
        avatar: currentUser.profilePicture,
        postID: post._id,
        userID: currentUser._id,
      }),
    })
    const data = await res.json()
    setNewComment(data)
  }

  return (
    <div>
      <div className="flex gap-x-4 mb-4 items-center">
        <CommentOutlined className="text-3xl" />
        <h3>Yorum Yaz</h3>
      </div>
      <Form onFinish={onFinish}>
        <Form.Item name="commentText">
          <Input.TextArea
            className='"w-full h-[200px] rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent p-2'
            placeholder="add comment..."
          />
        </Form.Item>
        <Form.Item name="rate" className="flex justify-end">
          <Rate />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button htmlType="submit">Yorum Yaz</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default WriteComment
