import { Button, Form, Input, Rate, message } from 'antd'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import {
  LikeFilled,
  DislikeFilled,
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons'

const Comment = ({ comments, setNewComment }) => {
  const [commentText, setCommentText] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const deleteComment = async (id) => {
    const res = await fetch(`/api/comment/delete-comment/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      message.success('Comment deleted successfully')
    }
    const data = await res.json()
    setNewComment(data)
  }

  const updateComment = async (id) => {
    const res = await fetch(`/api/comment/update-comment/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ commentText: commentText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    setNewComment(data)
    setIsEdit(false)
  }

  const { currentUser } = useSelector((state) => state.user)
  return comments?.map((comment) => {
    return (
      <div
        className="flex items-center gap-3 border w-full py-3 px-4"
        key={comment._id}
      >
        <img
          src={comment?.avatar}
          alt="user-avatar"
          className="w-16 h-16 rounded-full"
        />
        <div className="w-full">
          <div>
            <div className="flex gap-x-2 justify-between w-full">
              <div className="flex gap-x-2">
                <p>{comment?.username}</p>
                <p>
                  {comment.createdAt
                    .substring(0, 10)
                    .split('-')
                    .reverse()
                    .join('-')}
                </p>
              </div>
              <div className="flex gap-x-4">
                {currentUser?._id === comment?.userID && (
                  <EditFilled
                    onClick={() => setIsEdit(!isEdit)}
                    className="cursor-pointer hover:text-blue-600 duration-300 transition-all"
                  />
                )}
                {currentUser?._id === comment?.userID ||
                currentUser?.role === 'admin' ||
                currentUser?.role === 'moderator' ? (
                  <DeleteFilled
                    onClick={() => deleteComment(comment._id)}
                    className="cursor-pointer hover:text-red-600 duration-300 transition-all"
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            {isEdit ? (
              <Form>
                <Form.Item name="comment">
                  <Input.TextArea
                    className="w-full mt-4"
                    value={commentText}
                    defaultValue={comment?.commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </Form.Item>
                <div className="flex mt-4 gap-x-4 justify-end">
                  <Button
                    htmlType="submit"
                    onClick={() => updateComment(comment._id)}
                    className="bg-indigo-800 !text-white hover:bg-indigo-600 !outline-none !border-none"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => setIsEdit(!isEdit)}
                    className="bg-red-600 !text-white hover:bg-red-400 !outline-none !border-none"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <p>{comment?.commentText}</p>
            )}
            <p>
              <Rate
                defaultValue={comment.rate}
                className="text-base"
                disabled
              />
            </p>
          </div>
          <div className="flex gap-4 items-center mt-1">
            <p>
              <LikeFilled className="hover:text-blue-600 cursor-pointer transition-all duration-200 mr-2" />
              <span className="font-medium">{comment.likeCount}</span>
            </p>
            <p>
              <DislikeFilled className="hover:text-red-600  cursor-pointer transition-all duration-200 mr-2" />{' '}
              <span className="font-medium">{comment.dislikeCount}</span>
            </p>
          </div>
        </div>
      </div>
    )
  })
}
export default Comment
