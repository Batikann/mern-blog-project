import { createBrowserRouter } from 'react-router-dom'
import HeaderLayout from '../layout/HeaderLayout'
import PrivateRoute from '../components/PrivateRoute'
import Category from '../pages/Category/Category'
import Users from '../pages/Users/Users'

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
import AdminRoute from '../components/AdminRoute'

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
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
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
          {
            path: '/profile/category',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <Category />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: '/profile/users',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <Users />
                </AdminRoute>
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
