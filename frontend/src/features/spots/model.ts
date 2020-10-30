import { createEffect, combine, createEvent, forward, restore } from 'effector'
import { createRequestState, combineEvents } from 'utils'

import * as api from './api'

export const getSpots = createEffect(api.getSpots)
const spotsRequest = createRequestState(getSpots)
export const $spots = combine({ data: spotsRequest.$data, isLoading: spotsRequest.$isLoading })

export const googleMapApiIsLoaded = createEvent<any>()
const mapIsReady = combineEvents({ googleApi: googleMapApiIsLoaded, spots: getSpots.doneData }, false)

mapIsReady.watch(({ googleApi, spots }) => {
  const bounds = new googleApi.maps.LatLngBounds()
  spots.forEach(({ latitude, longitude }) => bounds.extend({ lat: latitude, lng: longitude }))
  googleApi.map.fitBounds(bounds)
})

export const spotSelected = createEvent<number>()
export const spotInfoClosed = createEvent()
export const $selectedSpot = restore(spotSelected, null).reset(spotInfoClosed)

const getSpot = createEffect(api.getSpot)
forward({ from: spotSelected, to: getSpot })

const spotRequest = createRequestState(getSpot)
export const $spot = combine({ data: spotRequest.$data, isLoading: spotRequest.$isLoading })
