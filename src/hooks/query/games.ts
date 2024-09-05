import { getTopGames, getTopStreamsByGame } from '@/shared/api/twitchApi/axios'
import { useQuery } from '@tanstack/react-query'

export function useGamesData() {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => getTopGames(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    retry: 0,
  })
}

export function usePopGamesStreams(
  selectedIndex: number,
  idGame: string,
  type: 'offline' | 'stream' | 'clips',
) {
  return useQuery({
    queryKey: [`getPopStreams${selectedIndex}${idGame}${type}`],
    queryFn: async () => getTopStreamsByGame(idGame, type),
    retry: 0,
    enabled: !!selectedIndex,
    staleTime: 50000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
