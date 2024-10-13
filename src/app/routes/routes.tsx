import { lazy } from 'react'
import { ProtectedSign } from '@/features/auth/protectedSign'
import { loader, Streamer, userIdLoader } from '@/pages/streamer'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/twitchApi/axios'
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'

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
          // loader: () => loader(),
          element: <Home />,
          async lazy() {
            let { loader, Home } = await import('../../pages/home')
            return { loader: loader(queryClient) as any, Component: Home }
          },
        },
        {
          path: PATH.STREAMER,
          // loader: () => loader(queryClient),
          async lazy() {
            // let { Streamer } = await import('../../pages/streamer')
            // return { Component: Streamer }
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
