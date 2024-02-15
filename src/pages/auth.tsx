import { useEffect } from 'react'
import {
  authControllerGetSessionInfo,
  authControllerSingIn,
  authControllerSingOut,
  authControllerSingUp,
} from '@/shared/api/generated'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

type Props = {}

export default function Auth(props: Props) {
  // const data = authControllerSingUp({ email: 'dimas.kirilyuk@gmail.com', password: 'dimas' })

  // console.log('Auth', data)
  useEffect(() => {
    const a = () => {
      const al = authControllerSingIn({ email: 'dimas.kirilyuk@gmail.com', password: '123' })
      return al
    }

    a()
  }, [])
  const { mutate } = useMutation({
    mutationKey: ['s'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authControllerSingIn({ email: email, password: password }),
  })
  const { mutate: out } = useMutation({
    mutationKey: ['ss'],
    mutationFn: () => authControllerSingOut(),
  })
  const { data } = useQuery({ queryKey: ['3423'], queryFn: () => authControllerGetSessionInfo() })
  return (
    <>
      <Button
        className="mt-60"
        onClick={() => mutate({ email: 'dimas.kirilyuk@gmail.com', password: '123' })}
      >
        regMy
      </Button>
      <Button className="mt-60" onClick={() => out()}>
        out
      </Button>
      <div className="mt-65 text-white">{data?.email} lol</div>
    </>
  )
}
