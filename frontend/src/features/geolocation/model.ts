import { createReEffect, TAKE_LAST } from 'effector-reeffect'

import type { TCoords } from 'types'

export const MOSCOW_COORDS: TCoords = {
  latitude: 55.751244,
  longitude: 37.618423,
}

const askUserGeolocation = () =>
  new Promise<TCoords>(resolve =>
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      () => resolve(MOSCOW_COORDS),
      { timeout: 1000 },
    ),
  )

export const createGetUserGeolocationFx = () =>
  createReEffect({
    handler: askUserGeolocation,
    strategy: TAKE_LAST,
  })
