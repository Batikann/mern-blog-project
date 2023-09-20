import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="w-full p-4 flex justify-between items-center border-b">
      <Link to="/">
        <h1 className="font-bold text-xl">MERN Blog Project</h1>
      </Link>
      <div className="flex gap-x-3 font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUser ? (
          <>
            <Link to="/profile" className="flex items-center gap-3">
              <p className="text-sm">{currentUser.username}</p>
              <img
                src={currentUser.profilePicture}
                alt={currentUser.username}
                className="w-9 h-9 object-cover rounded-full"
              />
            </Link>
          </>
        ) : (
          <Link to="/sign-in">Sign In</Link>
        )}
      </div>
    </div>
  )
}
