import { lazy } from 'react'
import Auth from '@/pages/auth'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/app/routes/layout'

import { PATH } from './path-constants'

const Home = lazy(() => import('@/pages/home'))
const Steamer = lazy(() => import('@/pages/streamer'))

export const router = createBrowserRouter([
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
          const [user, emotes] = await Promise.all([getUserById(params?.id), getEmotes(params?.id)])
          return { user, emotes }
        },
      },
      {
        path: PATH.AUTH,
        element: <Auth />,
      },
    ],
  },
])
export default function Routes() {
  return <RouterProvider router={router} />
}
