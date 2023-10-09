import { Rate } from 'antd'
import { useSelector } from 'react-redux'

const Comment = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="flex items-center gap-3 border w-full p-2">
      <img
        src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        alt="user-avatar"
        className="w-16 h-16 rounded-full"
      />
      <div>
        <div className="flex gap-x-2">
          <p>{currentUser.username}</p>
          <p>
            {post.createdAt.substring(0, 10).split('-').reverse().join('-')}
          </p>
        </div>
        <p>Çok fazla beğenmedim ama güzel yazı olmuş..</p>
        <p>
          <Rate defaultValue={2} className="text-base" />
        </p>
      </div>
    </div>
  )
}
export default Comment
