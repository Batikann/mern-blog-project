import { createBrowserRouter } from 'react-router-dom'
import HeaderLayout from '../layout/HeaderLayout'
import PrivateRoute from '../components/RouteAuth/PrivateRoute'
import Category from '../pages/AdminDashboard/Category/Category'
import Users from '../pages/AdminDashboard/Users/Users'

import {
  Home,
  About,
  ProfileEdit,
  SignIn,
  SignUp,
  Profile,
} from '../pages/PageComponents'
import MyPosts from '../pages/UserDashboard/Post/MyPosts'
import CreatePost from '../pages/UserDashboard/Post/CreatePost'
import AdminRoute from '../components/RouteAuth/AdminRoute'
import AdminDashboard from '../pages/AdminDashboard'
import CheckRole from '../components/RouteAuth/CheckRole'
import PostView from '../pages/UserDashboard/Post/PostView'

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
                <CheckRole>
                  <CreatePost />
                </CheckRole>
              </PrivateRoute>
            ),
          },
          {
            path: '/profile/posts',
            element: (
              <PrivateRoute>
                <CheckRole>
                  <MyPosts />
                </CheckRole>
              </PrivateRoute>
            ),
          },
          {
            path: '/profile/posts/view-post/:id',
            element: (
              <PrivateRoute>
                <CheckRole>
                  <PostView />
                </CheckRole>
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
