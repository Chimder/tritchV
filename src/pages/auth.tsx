import {
  authControllerGetSessionInfo,
  authControllerSingIn,
  authControllerSingOut,
} from '@/shared/api/generated'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function deleteTokenCookie() {
  document.cookie =
    'access-token-tritch=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;'
}
const Auth = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['in'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authControllerSingIn({ email: email, password: password }),
  })
  const { data } = useQuery({
    queryKey: ['login'],
    queryFn: () => authControllerGetSessionInfo(),
    retry: 0,
    staleTime: 1 * 60 * 1000,
  })
  const { mutate: out } = useMutation({
    mutationKey: ['ss'],
    mutationFn: () => authControllerSingOut(),
    onSuccess() {
      queryClient.removeQueries({ queryKey: ['in'], exact: true })
      deleteTokenCookie()
    },
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
      <div className="mt-65 text-white">{data?.email} lol</div>
    </>
  )
}

export default Auth
