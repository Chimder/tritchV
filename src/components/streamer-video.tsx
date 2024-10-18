import { useEffect, useState } from 'react'
import { getVideosByUserId } from '@/shared/api/twitchApi/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'

import CardVideo from './card-video'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const StreamerVideos = () => {
  const params = useParams()
  const id = params?.id as string

  const [type, setType] = useState<'offline' | 'stream' | 'clips'>('offline')

  const fetchVideos = async ({ pageParam = null }: { pageParam?: string | null }) => {
    const result = await getVideosByUserId(id, pageParam, type)
    return result
  }

  const { data, fetchNextPage, refetch, hasNextPage, isRefetching } = useInfiniteQuery({
    queryKey: ['getVideosByUserId', id],
    queryFn: fetchVideos,
    getNextPageParam: lastPage => lastPage?.nextCursor || null,
    initialPageParam: undefined,
    enabled: !!id,
    retry: 0,
    staleTime: 50000,
    refetchOnMount: false,
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
  }, [hasNextPage, inView])

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
            ? Array.from({ length: 12 }, (_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="relative mr-4 w-full overflow-hidden rounded-2xl"
                  style={{ paddingBottom: '56%' }}
                >
                  <div className="absolute inset-0 px-3">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              ))
            : videos?.map(video => (
                <CardVideo ref={ref} key={video.id} type={type} video={video} />
              ))}
        </div>
      </div>
    </section>
  )
}

export default StreamerVideos
