import { lazy } from 'react'
import Auth from '@/pages/auth'
import Test from '@/pages/test'
import { authControllerGetSessionInfo } from '@/shared/api/orvalBack/generated'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/twitchApi/axios'
import { ProtectedPage } from '@/shared/features/auth/protectedPage'
import { ProtectedSign } from '@/shared/features/auth/protectedSign'
import { useQuery } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'

import SignUp from '@/components/auth/sign-up'
import SingIn from '@/components/auth/sing-in'
import Layout from '@/app/routes/layout'

import { PATH } from './path-constants'

const Home = lazy(() => import('@/pages/home'))
const Steamer = lazy(() => import('@/pages/streamer'))

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: PATH.HOME,
          element: <Home />,
          loader: async () => {
            const load = await getTopGames()
            return load
          },
        },
        {
          path: PATH.STREAMER,
          element: <Steamer />,
          loader: async ({ params }) => {
            const [user, emotes] = await Promise.all([
              getUserById(params?.id),
              getEmotes(params?.id),
            ])
            return { user, emotes }
          },
        },
        {
          path: PATH.SIGNUP,
          element: (
            // <ProtectedSign>
              <SignUp />
            // </ProtectedSign>
          ),
        },
        {
          path: PATH.SIGNIN,
          element: (
            // <ProtectedSign>
              <SingIn />
            // </ProtectedSign>
          ),
        },
        // {
        //   path: PATH.SECURE,
        //   element: (
        //     <ProtectedPage>
        //       <Test />
        //     </ProtectedPage>
        //   ),
        // },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
