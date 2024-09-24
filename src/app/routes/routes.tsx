import { lazy } from 'react'
import { ProtectedSign } from '@/features/auth/protectedSign'
import { Streamer } from '@/pages/streamer'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/twitchApi/axios'
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'

import ReqResPassword from '@/components/auth/reqResPass'
import ResetPassword from '@/components/auth/resetPassword'
import SignIn from '@/components/auth/sign-in'
import SignUp from '@/components/auth/sign-up'
import Layout from '@/app/routes/layout'

import { PATH } from './path-constants'

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: PATH.HOME,
          async lazy() {
            let { Home } = await import('../../pages/home')
            return { Component: Home }
          },
        },
        {
          path: PATH.STREAMER,
          async lazy() {
            let { Streamer } = await import('../../pages/streamer')
            return { Component: Streamer }
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
