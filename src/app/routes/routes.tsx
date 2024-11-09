import { ProtectedSign } from '@/features/auth/protectedSign'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ReqResPassword from '@/components/auth/reqResPass'
import ResetPassword from '@/components/auth/resetPassword'
import SignIn from '@/components/auth/sign-in'
import SignUp from '@/components/auth/sign-up'
import { queryClient } from '@/components/providers/tanstack-query'
import Layout from '@/app/routes/layout'

import { Home } from '../../pages/home'
import { PATH } from './path-constants'

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: PATH.HOME,
          element: <Home />,
          async lazy() {
            let { loader, Home } = await import('../../pages/home')
            return { loader: loader(queryClient), Component: Home }
          },
        },
        {
          path: PATH.STREAMER,
          async lazy() {
            let { loader, Streamer } = await import('../../pages/streamer')
            return { loader: loader(queryClient), Component: Streamer }
          },
        },
        {
          path: PATH.SIGNUP,
          element: (
            <ProtectedSign>
              <SignUp />
            </ProtectedSign>
          ),
        },
        {
          path: PATH.SIGNIN,
          element: (
            <ProtectedSign>
              <SignIn />
            </ProtectedSign>
          ),
        },
        {
          path: PATH.REQRESPASS,
          element: (
            <ProtectedSign>
              <ReqResPassword />
            </ProtectedSign>
          ),
        },
        {
          path: PATH.RESETPASSWORD,
          element: (
            <ProtectedSign>
              <ResetPassword />
            </ProtectedSign>
          ),
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
