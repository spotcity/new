import { combine, createEvent, restore } from 'effector'
import { createReEffect, TAKE_LAST } from 'effector-reeffect'
import { isNil } from 'ramda'

import { createRequestState, combineEvents } from 'lib/effector'

import * as api from './api'

// Map
export const getSpotsFx = createReEffect({ handler: api.getSpots, strategy: TAKE_LAST })
const spotsRequest = createRequestState(getSpotsFx)
export const $spots = combine({ data: spotsRequest.$data, isLoading: spotsRequest.$isLoading })

export const googleMapApiIsLoaded = createEvent<any>()
const mapIsReady = combineEvents({ googleApi: googleMapApiIsLoaded, spots: getSpotsFx.doneData }, false)

mapIsReady.watch(({ googleApi, spots }) => {
  const bounds = new googleApi.maps.LatLngBounds()
  spots.forEach(({ latitude, longitude }) => bounds.extend({ lat: latitude, lng: longitude }))
  googleApi.map.fitBounds(bounds)
})

// Spot info
export const spotSelected = createEvent<number>()
export const spotInfoClosed = createEvent()
export const $selectedSpot = restore(spotSelected, null).reset(spotInfoClosed)

const getSpotFx = createReEffect({ handler: api.getSpot, strategy: TAKE_LAST })

$selectedSpot.updates.watch(id => {
  if (!isNil(id)) {
    getSpotFx(id)
  }
})

const spotRequest = createRequestState(getSpotFx)
export const $spot = combine({ data: spotRequest.$data, isLoading: spotRequest.$isLoading })
