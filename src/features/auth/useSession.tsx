import {
  accountControllerGetAccount,
  authControllerGetSessionInfo,
  authControllerSingOut,
} from '@/shared/api/swagger/generated'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const queryKeySession = ['session']
export function useSessionQuery() {
  return useQuery({
    queryKey: queryKeySession,
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useAccountInfo() {
  return useQuery({
    queryKey: ['account'],
    queryFn: accountControllerGetAccount,
    retry: 0,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useAccountSingOut() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['singOut'],
    mutationFn: () => authControllerSingOut(),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['account'], exact: true })
    },
  })
}
