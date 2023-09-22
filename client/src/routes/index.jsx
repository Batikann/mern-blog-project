import { createBrowserRouter } from 'react-router-dom'
import HeaderLayout from '../layout/HeaderLayout'
import {
  Home,
  About,
  ProfileEdit,
  SignIn,
  SignUp,
  Profile,
} from '../pages/PageComponents'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: '/profile/edit',
            element: <ProfileEdit />,
          },
        ],
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
])
