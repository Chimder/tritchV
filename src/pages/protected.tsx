import { PropsWithChildren } from 'react'
import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useNavigate } from 'react-router-dom'

import { PATH } from '@/app/routes/path-constants'

interface ProtectedPageProps {
  children: React.ReactNode
}

export function ProtectedPage({ children }: PropsWithChildren<ProtectedPageProps>) {
  const navigate = useNavigate()
  const {
    data: session,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['login'],
    queryFn: () => authControllerGetSessionInfo(),
    retry: 0,
    staleTime: 30 * 1000,
  })
  console.log('SessSion', session)
  // if (session === undefined) {
  //   return null
  // }

  if (!session?.email) {
    navigate(PATH.AUTH)
    return null
  }

  return <>{children}</>
}
