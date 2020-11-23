import { request } from 'features/core'

import type { TSpot } from './types'

type TRawSpot = {
  latitude?: string
  longitude?: string
  id: number
  name?: string
}

const processSpot = ({ id, latitude, longitude, name }: TRawSpot) => {
  const lt = String(latitude)
  const lg = String(longitude)
  return { id, name, latitude: parseFloat(lt), longitude: parseFloat(lg) }
}

export const getSpot = async (id: number) => {
  try {
    const rawSpot = await request.get<TRawSpot>(`/api/spots/${id}`)
    return processSpot(rawSpot)
  } catch (e) {
    return null
  }
}

export const getSpots = async () => {
  try {
    const rawSpots = await request.get<TRawSpot[]>('/api/spots')
    return rawSpots.map(processSpot)
  } catch (e) {
    return []
  }
}
