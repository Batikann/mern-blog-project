import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center border-b">
      <Link to="/">
        <h1 className="font-bold text-xl">MERN Blog Project</h1>
      </Link>
      <div className="flex gap-x-3 font-medium">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  )
}
