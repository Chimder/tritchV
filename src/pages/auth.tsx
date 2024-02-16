import {
  authControllerGetSessionInfo,
  authControllerSingIn,
  authControllerSingOut,
} from '@/shared/api/generated'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

const Auth = () => {
  const { mutate } = useMutation({
    mutationKey: ['in'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authControllerSingIn({ email: email, password: password }),
  })
  // const { data } = useQuery({
  //   queryKey: ['login'],
  //   queryFn: () => authControllerGetSessionInfo(),
  //   retry: 0,
  //   staleTime: 30 * 60 * 1000,
  // })
  const { mutate: out } = useMutation({
    mutationKey: ['ss'],
    mutationFn: () => authControllerSingOut(),
  })
  return (
    <>
      <Button
        className="mt-60"
        onClick={() => mutate({ email: 'dimas.kirilyuk@gmail.com', password: '123' })}
      >
        In
      </Button>
      <Button className="mt-60" onClick={() => out()}>
        out
      </Button>
      <div className="mt-65 text-white"> lol</div>
    </>
  )
}

export default Auth
