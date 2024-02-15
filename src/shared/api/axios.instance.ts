// import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// const url = process.env.NEST_API

// export const AXIOS_INSTANCE = Axios.create({
//   baseURL: url,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// export const customInstance = <T>(
//   config: AxiosRequestConfig,
//   options?: AxiosRequestConfig,
// ): Promise<T> => {
//   return AXIOS_INSTANCE({
//     ...config,
//     ...options,
//   }).then(({ data }) => data)
// }

// export type ErrorType<Error> = AxiosError<Error>

// export type BodyType<Data> = Data

import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'http://[::1]:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData

// Or, in case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
//  export type BodyType<BodyData> = CamelCase<BodyData>;
