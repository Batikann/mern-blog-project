import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user)

  if (currentUser) {
    return children
  } else {
    return <Navigate to="/sign-in" />
  }
}

export default PrivateRoute
