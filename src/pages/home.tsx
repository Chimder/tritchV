import { lazy } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { ScrollRestoration } from 'react-router-dom'

import { useGamesData } from '@/hooks/query/games'
import { Button } from '@/components/ui/button'
import { DialogInput } from '@/components/dialog-input'

const EmblaCarousel = lazy(() => import('@/components/carousel'))

export function Home() {
  const { data: games } = useGamesData()

  if (!games) return <>no data</>

  return (
    <main className="h-[2000px] overflow-hidden">
      <ScrollRestoration />
      <section className="w-full">
        <div className="flex flex-col items-center justify-end bg-background pb-10 pt-24 md:py-12">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="pb-4 pt-12 text-9xl xl:text-6xl md:pt-16 md:text-4xl ">
              Discover Twitch Vods
            </h1>
            <p className="pb-10 text-center text-2xl lg:text-base md:pb-6 md:text-sm">
              Watch twitch past broadcasts streams Start by Typing twitch username...
            </p>
          </div>
          <DialogInput>
            <Button className="bg-button-foreground  px-40 text-xl text-text text-white lg:text-base md:px-32 md:text-sm sm:px-28">
              <MagnifyingGlassIcon className="h-6 w-6 pr-1" />
              Search Steamer
            </Button>
          </DialogInput>
        </div>
      </section>
      <section className="relative flex w-full flex-col items-center justify-center rounded-2xl ">
        <div>
          <h1 className="pb-3 text-7xl text-white xl:text-6xl md:text-4xl">Top streams Now</h1>
        </div>
        <EmblaCarousel slides={games} />
      </section>
    </main>
  )
}
