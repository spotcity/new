import ky from 'ky'

// TODO: error handling
const get = <T>(...args: Parameters<typeof ky.get>) => ky.get(...args).json<T>()
const post = <T>(...args: Parameters<typeof ky.post>) => ky.post(...args).json<T>()

export const request = { get, post }
