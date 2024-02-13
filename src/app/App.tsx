import React, { lazy } from 'react'
import { LoaderStreamerData } from '@/pages/streamer'
import { getEmotes, getTopGames, getUserById, getUserClips } from '@/shared/api/axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/app/routes/layout'

import { PATH } from './routes/pathConstants'

const Home = lazy(() => import('@/pages/home'))
const Steamer = lazy(() => import('@/pages/streamer'))

function App() {
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: PATH.HOME,
          element: <Home />,
          loader: async () => {
            const load = await getTopGames()
            console.log('LOADER', load)
            return load
          },
        },
        {
          path: PATH.STREAMER,
          element: <Steamer />,
          loader: async ({ params }) => {
            const user = await getUserById(params?.id)
            const emotes = await getEmotes(params?.id)
            return { user, emotes }
          },
        },
      ],
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
