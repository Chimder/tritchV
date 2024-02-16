import { lazy } from 'react'
import Auth from '@/pages/auth'
import { ProtectedPage } from '@/pages/protected'
import Test from '@/pages/test'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/axios'
import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'

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
          path: PATH.AUTH,
          element: <Auth />,
        },
        {
          path: PATH.SECURE,
          element: (
            <ProtectedPage>
              <Test />
            </ProtectedPage>
          ),
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
