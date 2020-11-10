import { createEvent, sample, createEffect } from 'effector'
import { createReEffect, TAKE_LAST } from 'effector-reeffect'

import { createRequestState, combineEvents } from 'lib/effector-tools'

import * as api from '../api'
import type { TSpot } from '../types'

import { anotherSpotSelected } from './spot-info'

// TODO: TGoogleMapApi typings
type TGoogleMapApi = any
type TCenterMarkerFxPayload = {
  googleMapApi: TGoogleMapApi
  spot: TSpot
}

const getSpotsFx = createReEffect({ handler: api.getSpots, strategy: TAKE_LAST })
const centerMarkerFx = createEffect(({ googleMapApi, spot }: TCenterMarkerFxPayload) => {
  const { map } = googleMapApi
  const { latitude, longitude } = spot
  map.setZoom(17)
  map.panTo({ lat: latitude, lng: longitude })
})

const googleMapApiIsLoaded = createEvent<TGoogleMapApi>()
const mapIsReady = combineEvents({ googleMapApi: googleMapApiIsLoaded, spots: getSpotsFx.doneData }, false)

const $spots = createRequestState(getSpotsFx).map(({ data, isLoading }) => ({ data, isLoading }))

mapIsReady.watch(({ googleMapApi, spots }) => {
  const { map, maps } = googleMapApi
  const bounds = new maps.LatLngBounds()
  spots.forEach(({ latitude, longitude }) => bounds.extend({ lat: latitude, lng: longitude }))
  map.fitBounds(bounds)
})

sample({
  source: googleMapApiIsLoaded,
  clock: anotherSpotSelected,
  fn: (googleMapApi, spot) => ({ googleMapApi, spot }),
  target: centerMarkerFx,
})

export { $spots, googleMapApiIsLoaded, getSpotsFx }
