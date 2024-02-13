import { lazy } from 'react'
import { Emotes, TwitchUser } from '@/shared/api/types'
import { useLoaderData } from 'react-router-dom'

import StreamerInfo from '@/components/Streamer-info'

const StreamerVideos = lazy(() => import('@/components/Streamer-video'))

export interface LoaderStreamerData {
  user: TwitchUser
  emotes: Emotes[]
  clips: any
}

const Streamer = () => {
  const { user, emotes } = useLoaderData() as LoaderStreamerData
  return (
    <article className="overflow-hidden">
      <StreamerInfo user={user} emotes={emotes} />
      <StreamerVideos />
    </article>
  )
}

export default Streamer
