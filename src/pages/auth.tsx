import { useEffect } from 'react'
import {
  authControllerGetSessionInfo,
  authControllerSingIn,
  authControllerSingOut,
} from '@/shared/api/generated'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

const Auth = () => {
  const { data } = useQuery({
    queryKey: ['login'],
    queryFn: () => authControllerGetSessionInfo(),
  })
  const { mutate: out } = useMutation({
    mutationKey: ['ss'],
    mutationFn: () => authControllerSingOut(),
  })
  return (
    <>
      {/* <Button
        className="mt-60"
        onClick={() => mutate({ email: 'dimas.kirilyuk@gmail.com', password: '123' })}
      >
        regMy
      </Button> */}
      <Button className="mt-60" onClick={() => out()}>
        out
      </Button>
      <div className="mt-65 text-white">{data?.email} lol</div>
    </>
  )
}

export default Auth
