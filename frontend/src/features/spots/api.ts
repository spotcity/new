import { request } from 'features/core'

type TRawSpot = {
  geo?: string
  id: number
  name?: string
}

const processSpot = ({ id, geo, name }: TRawSpot) => {
  const [latitude, longitude] = geo?.split(', ') || []
  return { id, name, latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
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
