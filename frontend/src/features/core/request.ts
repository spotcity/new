import ky from 'ky'

const API_PREFIX = '/api'

// TODO: error handling
const handleError = (error: any) => {
  console.error(error)
  throw error
}

const get = <T>(url: string) => ky.get(`${API_PREFIX}${url}`).json<T>().catch(handleError)
const post = <T>(url: string) => ky.post(`${API_PREFIX}${url}`).json<T>().catch(handleError)

export const request = { get, post }
