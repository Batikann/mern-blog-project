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
import AdminDashboard from '../pages/AdminDashboard'
import CheckRole from '../components/CheckRole'

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
            <CheckRole>
              <Profile />
            </CheckRole>
          </PrivateRoute>
        ),
        children: [
          {
            path: '/profile/edit',
            element: (
              <PrivateRoute>
                <CheckRole>
                  <ProfileEdit />
                </CheckRole>
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
            path: '/profile/posts',
            element: (
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: '/admin',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
        children: [
          {
            path: '/admin/category',
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <Category />
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: '/admin/users',
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
