import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

const HeaderLayout = () => {
  return (
    <div>
      <Header />
      <div className="xl:mt-24 mt-14 p-4">
        <Outlet />
      </div>
    </div>
  )
}
export default HeaderLayout
