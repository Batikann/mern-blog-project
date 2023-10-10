import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

const HeaderLayout = () => {
  return (
    <div>
      <Header />
      <div className="mt-24">
        <Outlet />
      </div>
    </div>
  )
}
export default HeaderLayout
