import { authControllerSingIn, authControllerSingOut } from '@/shared/api/generated'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'

const Auth = () => {
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authControllerSingIn({ email: email, password: password }),
  })
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
        regMy
      </Button>
      <Button className="mt-60" onClick={() => out()}>
        out
      </Button>
      <div className="mt-65 text-white"> lol</div>
    </>
  )
}

export default Auth
