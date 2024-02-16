import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

// import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

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

const url = process.env.NEST_API

export const AXIOS_INSTANCE = Axios.create({
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

// Or, in case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
//  export type BodyType<BodyData> = CamelCase<BodyData>;
