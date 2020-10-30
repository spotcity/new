import ky from 'ky'

import { delay } from 'utils'

// TODO: error handling
const get = <T>(...args: Parameters<typeof ky.get>) => delay(1500).then(() => ky.get(...args).json<T>())
const post = <T>(...args: Parameters<typeof ky.post>) => delay(1500).then(() => ky.post(...args).json<T>())

export const request = { get, post }
