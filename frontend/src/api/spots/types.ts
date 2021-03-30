import type { TCoords } from 'types'

export type TSpot = TCoords & {
  id: number
  name?: string
}
