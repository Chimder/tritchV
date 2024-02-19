import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

const url = import.meta.env.VITE_BACK_API

export const AXIOS_INSTANCE = Axios.create({
  // baseURL: 'http://[::1]:4000',
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data)

  return promise
}

export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData
