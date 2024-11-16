import { PropsWithChildren, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { DotFilledIcon, ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { useSearchInput } from '@/hooks/query/user'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'

export function DialogInput({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const { data: searchResults, isFetching } = useSearchInput(debouncedSearchQuery)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:top-100 z-[1100] h-auto max-w-lg rounded-xl border-[3px] border-card bg-black sm:absolute sm:top-64">
        <DialogHeader className="">
          <DialogTitle className="flex items-center justify-center whitespace-nowrap">
            Search streamer
            {isFetching && <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />}
          </DialogTitle>
        </DialogHeader>
        <div className="pt-3">
          <Input
            className="border-card focus:border-card active:border-card"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          ></Input>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="overflow-hidden"
        >
          {searchResults?.map(channel => (
            <div key={channel.display_name}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative flex h-16 cursor-pointer list-none items-start rounded-lg pl-5 pt-3 text-secondary no-underline  hover:bg-card hover:opacity-80"
                key={channel.id}
                onClick={() => navigate(`/streamer/${channel.id}`)}
              >
                <div className="flex items-center justify-center">
                  <img
                    className="w-10 rounded-full"
                    width={320}
                    height={180}
                    src={channel.thumbnail_url}
                    loading="lazy"
                    alt=""
                  />

                  <span className="top[-20px] relative pl-5 text-white">
                    {channel.display_name}
                  </span>
                  {channel.is_live && (
                    <DotFilledIcon className="relative left-1 top-[2px] animate-pulse text-red-700"></DotFilledIcon>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
