import { lazy } from 'react'
import { ScrollRestoration } from 'react-router-dom'

const StreamerInfo = lazy(() => import('@/components/streamer-info'))
const StreamerVideos = lazy(() => import('@/components/streamer-video'))

const Streamer = () => {
  return (
    <article className="overflow-hidden">
      <ScrollRestoration />
      <StreamerInfo />
      <StreamerVideos />
    </article>
  )
}

export default Streamer
