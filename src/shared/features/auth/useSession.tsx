import {
  accountControllerGetAccount,
  authControllerGetSessionInfo,
} from '@/shared/api/orvalBack/generated'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useSessionQuery() {
  return useQuery({
    queryKey: ['session'],
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 24 * 60 * 60 * 1000,
  })
}

export function useResetSession() {
  const queryClient = useQueryClient()
  return () => queryClient.removeQueries()
}

export function useAccountInfo() {
  return useQuery({
    queryKey: ['account'],
    queryFn: accountControllerGetAccount,
    retry: 0,
    staleTime: 24 * 60 * 60 * 1000,
  })
}
