import type { TBounds, TCoords } from 'types'

import type { TSpot } from './types'

const delay = <T>(data: T, ms: number) => new Promise<T>(r => setTimeout(() => r(data), ms))

const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const generateSpotCoords = (bounds: TBounds): TCoords => {
  const { nw, se } = bounds
  const latitude = randomNumber(nw.latitude, se.latitude)
  const longitude = randomNumber(nw.longitude, se.longitude)

  return {
    latitude,
    longitude,
  }
}

const getOne = (id: number) =>
  delay({ id: Math.floor(Math.random() * 10000), name: 'Test name', latitude: 55.751244, longitude: 37.618423 }, 1500)

const getMany = (bounds: TBounds) =>
  delay<TSpot[]>(
    [...new Array(10)].map((v, i) => ({
      id: Math.round(randomNumber(1, 10000)),
      name: `Test name ${i}`,
      ...generateSpotCoords(bounds),
    })),
    1500,
  )

export const spotsApi = { getMany, getOne }
