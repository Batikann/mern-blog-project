import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user)
  if (currentUser.role === 'admin') {
    return children
  } else {
    return <Navigate to="/profile" />
  }
}
export default AdminRoute
