import { lazy, Suspense } from 'react'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from '@/app/routes/layout'

import Loading from '../../components/Loading'
import { PATH } from './path-constants'

const Home = lazy(() => import('@/pages/home'))
const Steamer = lazy(() => import('@/pages/streamer'))

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        loader: async () => {
          const load = await getTopGames()
          return load
        },
      },
      {
        path: PATH.STREAMER,
        element: (
          <Suspense fallback={<Loading />}>
            <Steamer />
          </Suspense>
        ),
        // loader: async ({ params }) => {
        //   const user = await getUserById(params?.id)
        //   const emotes = await getEmotes(params?.id)
        //   return { user, emotes }
        // },
      },
    ],
  },
])
export default function Routes() {
  return <RouterProvider router={router} />
}
