import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATH } from '@/app/routes/path-constants'

import { useSessionQuery } from './useSession'

interface ProtectedPageProps {
  children: React.ReactNode
}

export function ProtectedPage({ children }: PropsWithChildren<ProtectedPageProps>) {
  const navigate = useNavigate()

  const { data: session } = useSessionQuery()
  console.log('Session', session)

  if (!session?.email) {
    navigate(PATH.AUTH)
    return null
  }

  return <>{children}</>
}
