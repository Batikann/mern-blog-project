import { createBrowserRouter } from 'react-router-dom'
import HeaderLayout from '../layout/HeaderLayout'
import PrivateRoute from '../components/PrivateRoute'

import {
  Home,
  About,
  ProfileEdit,
  SignIn,
  SignUp,
  Profile,
} from '../pages/PageComponents'
import MyPosts from '../pages/Profile/MyPosts'
import CreatePost from '../pages/Profile/CreatePost'

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
            element: (
              <PrivateRoute>
                <ProfileEdit />
              </PrivateRoute>
            ),
          },
          {
            path: '/profile/posts',
            element: (
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            ),
          },
          {
            path: '/profile/posts/create-post',
            element: (
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            ),
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
