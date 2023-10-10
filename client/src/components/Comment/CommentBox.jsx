import { Rate } from 'antd'
import { useSelector } from 'react-redux'
import { LikeFilled, DislikeFilled } from '@ant-design/icons'

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
        <div className="flex gap-4 items-center mt-1">
          <p>
            <LikeFilled className="hover:text-blue-600 cursor-pointer transition-all duration-200 mr-2" />
            <span className="font-medium">2</span>
          </p>
          <p>
            <DislikeFilled className="hover:text-red-600  cursor-pointer transition-all duration-200 mr-2" />{' '}
            <span className="font-medium">3</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Comment
