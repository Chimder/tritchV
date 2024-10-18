import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useUserById, useUserEmotes } from '@/hooks/query/user'

export default function StreamerInfo() {
  const { id } = useParams()
  const { data: user } = useSuspenseQuery(useUserById(id))
  const { data: emotes } = useSuspenseQuery(useUserEmotes(id))

  const getRandomPosition = () => ({
    top: `${Math.random() * 32}vh`,
    left: `${Math.random() * 98}vw`,
    transform: `rotate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 10}deg)`,
  })

  if (!id) return
  return (
    <>
      <div className="z-1 absolute mt-16 flex h-[60vh] w-full overflow-x-hidden">
        {emotes?.map(emote => (
          <div key={emote.id} style={getRandomPosition()} className="z-1 absolute m-4">
            <img className="z-1" src={emote.images.url_2x} alt="" />
          </div>
        ))}
      </div>
      <section className="container z-100 flex flex-col items-center justify-center pb-10">
        <div className="z-[500] flex w-full flex-col items-center justify-center pt-28">
          <div className="z-[500]"></div>
          <img
            className="z-[500] h-60 w-60 rounded-full border-[2px] border-border pb-1"
            src={user?.profile_image_url}
            alt=""
          />
          <h1 className="rounded-xl border-[2px] border-border bg-black px-2 pb-4 text-6xl lg:text-4xl">
            {user?.display_name}
          </h1>
          <h2 className="rounded-xl border-[2px] border-border bg-black px-2 text-center text-xl lg:text-base">
            {user?.description}
          </h2>
        </div>
        <div className="mt-5 flex items-center justify-center rounded-2xl border-[3px] border-border md:flex-col">
          <iframe
            title="VideoPlayer"
            className="relative h-[68vh] w-[70vw] rounded-2xl pr-2 lg:h-[58vh] lg:w-[75vw] md:h-[50vh] md:w-[96vw] md:pb-1 md:pr-0 sm:h-[30vh]"
            src={`https://player.twitch.tv/?channel=${user?.login}&autoplay=1&muted=1&parent=localhost&parent=tritch-vite.vercel.app`}
          ></iframe>
          <iframe
            title="chat"
            className=" h-[68vh] w-[18vw] rounded-2xl lg:h-[58vh] lg:w-[21vw] md:h-[42vh] md:w-[96vw] "
            src={`https://www.twitch.tv/embed/${user?.login}/chat?parent=localhost&parent=tritch-vite.vercel.app&darkpopout`}
          ></iframe>
        </div>
      </section>
    </>
  )
}
