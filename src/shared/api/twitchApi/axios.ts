import axios, { type AxiosResponse } from 'axios'

import type {
  AccessTokenResponse,
  Channel,
  Emotes,
  SearchChannelsResponse,
  TopGame,
  TwitchCurrent,
  TwitchStream,
  TwitchStreamResponse,
  TwitchUser,
  TwitchUserResponse,
  TwitchVideo,
  TwitchVideoResponse,
} from './types'

async function getAccessToken(): Promise<string> {
  try {
    const clientId = import.meta.env.VITE_PUBLIC_CLIENT_ID
    const clientSecret = import.meta.env.VITE_PUBLIC_CLIENT_SECRET
    const response: AxiosResponse<AccessTokenResponse> = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        },
      },
    )

    const newAccessToken = response.data.access_token
    if (!response.data.expires_in) return newAccessToken
    const expirationTime = Date.now() + response.data.expires_in * 1000

    localStorage.setItem('twitch_access_token', newAccessToken)
    localStorage.setItem('twitch_token_expiration', expirationTime.toString())

    return newAccessToken
  } catch (error) {
    console.error('Error fetching access token:', error)
    throw new Error('Failed to retrieve access token')
  }
}

let token: string | null = null
let tokenPromise: Promise<string> | null = null

export async function fetchToken(): Promise<string> {
  const savedToken = localStorage.getItem('twitch_access_token')
  const savedExpiration = localStorage.getItem('twitch_token_expiration')

  if (savedToken && savedExpiration && Date.now() < Number.parseInt(savedExpiration)) {
    token = savedToken
    return token
  }

  if (tokenPromise) {
    return tokenPromise
  }

  tokenPromise = getAccessToken().then(fetchedToken => {
    token = fetchedToken
    tokenPromise = null
    return token
  })

  return tokenPromise
}

export async function searchChannels(searchQuery: string): Promise<Channel[]> {
  const accessToken = await fetchToken()
  try {
    const response: AxiosResponse<SearchChannelsResponse> = await axios.get(
      'https://api.twitch.tv/helix/search/channels',
      {
        params: {
          query: searchQuery,
          first: 5,
        },
        headers: {
          'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
        },
      },
    )

    return response.data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export async function getUserById(userId?: string): Promise<TwitchUser | null> {
  const accessToken = await fetchToken()

  try {
    const response = await axios.get<TwitchUserResponse>('https://api.twitch.tv/helix/users', {
      params: {
        id: userId,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const user = response.data.data[0]
    return user || null
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getCurrentStreamByUserId(
  userId: string,
  accessToken?: string,
): Promise<TwitchStream | null> {
  try {
    const response = await axios.get<TwitchStreamResponse>('https://api.twitch.tv/helix/streams', {
      params: {
        user_id: userId,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const stream = response.data.data[0]
    return stream || null
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export async function getVideosByUserId(
  userId: string,
  cursor: string | null,
  type: 'offline' | 'stream' | 'clips',
): Promise<{ videos: TwitchVideo[]; nextCursor: string | null }> {
  const accessToken = await fetchToken()

  try {
    let url
    if (type === 'clips') {
      url = `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}`
    } else {
      url = `https://api.twitch.tv/helix/videos?user_id=${userId}`
    }
    const { data } = await axios.get<TwitchVideoResponse>(url, {
      params: {
        first: 40,
        after: cursor,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const videos = data.data
    const nextCursor = data.pagination.cursor

    return { videos, nextCursor }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getTopGames(): Promise<TopGame[]> {
  const accessToken = await fetchToken()

  try {
    const { data } = await axios.get('https://api.twitch.tv/helix/games/top', {
      params: {
        first: 100,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export async function getTopStreamsByGame(gameId: string, type: string): Promise<TwitchCurrent[]> {
  const accessToken = await fetchToken()

  try {
    let url
    if (type === 'clips') {
      url = 'https://api.twitch.tv/helix/clips'
    } else {
      url = 'https://api.twitch.tv/helix/streams'
    }

    const { data } = await axios.get(url, {
      params: {
        game_id: gameId,
        first: 40,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export async function getEmotes(userId?: string): Promise<Emotes[]> {
  const accessToken = await fetchToken()

  try {
    const { data } = await axios.get('https://api.twitch.tv/helix/chat/emotes', {
      params: {
        broadcaster_id: userId,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data?.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export async function getUserClips(userId?: string): Promise<any> {
  const accessToken = await fetchToken()

  try {
    const { data } = await axios.get('https://api.twitch.tv/helix/clips', {
      params: {
        broadcaster_id: userId,
      },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}
export async function getGameClips(): Promise<any> {
  const accessToken = await fetchToken()

  try {
    const { data } = await axios.get('https://api.twitch.tv/helix/clips', {
      // params: {
      //   game_id: gameId,
      // },
      headers: {
        'Client-ID': import.meta.env.VITE_PUBLIC_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    throw error
  }
}
