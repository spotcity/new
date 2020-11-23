import { request } from 'features/core'

import type { TSpot } from './types'

export const getSpot = (id: number) => request.get<TSpot>(`/api/spots/${id}`).catch(() => null)

export const getSpots = async () => request.get<TSpot[]>('/api/spots/').catch(() => [] as TSpot[])
