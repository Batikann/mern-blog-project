import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CheckRole = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user)

  if (currentUser.role === 'user') {
    return children
  } else {
    return <Navigate to="/admin" />
  }
}
export default CheckRole
