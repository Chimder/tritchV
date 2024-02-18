import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATH } from '@/app/routes/path-constants'

import { useAccountInfo, useSessionQuery } from './useSession'

interface ProtectedPageProps {
  children: React.ReactNode
}

export function ProtectedSign({ children }: PropsWithChildren<ProtectedPageProps>) {
  const navigate = useNavigate()

  const { data: session } = useAccountInfo()

  console.log('AUTHSES', session)
  if (session) {
    navigate(PATH.HOME)
    return null
  }

  return <>{children}</>
}
