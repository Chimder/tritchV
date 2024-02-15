import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

const url = process.env.NEST_API
export const AXIOS_INSTANCE = Axios.create({
  baseURL: url?.toString(),
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data)
}

export type ErrorType<Error> = AxiosError<Error>

export type BodyType<Data> = Data
