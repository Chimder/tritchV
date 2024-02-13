import React, { useEffect, useState } from 'react'
import { getVideosByUserId } from '@/shared/api/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'

import CardVideo from './card-video'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

export default function StreamerVideos() {
  const params = useParams()
  const id = params?.id as string
  const [type, setType] = useState<'offline' | 'stream' | 'clips'>('offline')

  const fetchVideos = async ({ pageParam = null }: { pageParam?: string | null }) => {
    const result = await getVideosByUserId(id, pageParam, type)
    return result
  }

  const { data, fetchNextPage, refetch, hasNextPage, isRefetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['getVideosByUserId', id],
      queryFn: fetchVideos,
      getNextPageParam: lastPage => lastPage?.nextCursor || null,
      initialPageParam: undefined,
      refetchOnWindowFocus: false,
    })
  const ToggleType = async (type: 'offline' | 'stream' | 'clips') => {
    await setType(type)
    await refetch()
  }

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  const videos = data?.pages?.flatMap(page => page?.videos)
  return (
    <section className="container pt-2 ">
      <div className="rounded-xl border-[2px] border-border">
        <div className="flex items-center justify-evenly py-4">
          <Button
            onClick={() => ToggleType('offline')}
            variant="ghost"
            className={`border-[2px] border-border  px-[12vw] py-[2vh] text-white ${
              type === 'offline' ? 'bg-primary' : ''
            }`}
          >
            Streams
          </Button>
          <Button
            onClick={() => ToggleType('clips')}
            variant="ghost"
            className={`border-[2px] border-border px-[12vw] py-[2vh] text-white ${
              type === 'clips' ? 'bg-primary' : ''
            }`}
          >
            Clips
          </Button>
        </div>
        <div className="gridCard">
          {isRefetching
            ? Array.from({ length: 80 }, (_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate="visible"
                    exit={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative mr-4 w-full overflow-hidden rounded-2xl"
                    style={{ paddingBottom: '52%' }}
                  >
                    <div className="absolute inset-0 px-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </motion.div>
                </React.Fragment>
              ))
            : videos?.map(video => (
                <motion.div
                  ref={ref}
                  key={video.id}
                  initial={{ opacity: 0.7, scale: 1 }}
                  exit={{ opacity: 0.6, scale: 1 }}
                  transition={{ duration: 1 }}
                  animate="visible"
                >
                  <CardVideo key={video.id} type={type} video={video}></CardVideo>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}
