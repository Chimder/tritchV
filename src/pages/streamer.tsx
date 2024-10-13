import { lazy } from 'react'
import { getEmotes, getUserById } from '@/shared/api/twitchApi/axios'
import { QueryClient, queryOptions } from '@tanstack/react-query'
import { LoaderFunctionArgs, ScrollRestoration, useLoaderData } from 'react-router-dom'

const StreamerInfo = lazy(() => import('@/components/streamer-info'))
const StreamerVideos = lazy(() => import('@/components/streamer-video'))

export const getUserByIId = (id: string) =>
  queryOptions({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    retry: 0,
  })

export const getUserEm = (id: string) =>
  queryOptions({
    queryKey: ['userEmotes', id],
    queryFn: () => getEmotes(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    retry: 0,
  })

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
      console.log(params.id)
      throw new Error('No contact ID provided')
    }
    const id = params.id

    const user = queryClient.ensureQueryData(getUserByIId(id))
    const emotes = queryClient.ensureQueryData(getUserEm(id))
    return id
  }
export const Streamer = () => {
  const data = useLoaderData()
  return (
    <article className="overflow-hidden">
      <ScrollRestoration />
      <StreamerInfo />
      <StreamerVideos />
    </article>
  )
}
