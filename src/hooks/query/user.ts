import { getEmotes, getUserById, searchChannels } from '@/shared/api/twitchApi/axios'
import { useQuery } from '@tanstack/react-query'

export function useUserById(id: string | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    retry: 0,
  })
}
export function useUserEmotes(id: string | undefined) {
  return useQuery({
    queryKey: ['userEmotes', id],
    queryFn: () => getEmotes(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    retry: 0,
  })
}

export function useSearchInput(debouncedSearchQuery: string) {
  return useQuery({
    queryKey: ['searchResults', debouncedSearchQuery],
    queryFn: async () => searchChannels(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
    refetchOnWindowFocus: false,
  })
}
