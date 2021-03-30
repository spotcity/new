import { createEvent, forward, createStore, Event, combine } from 'effector'
import { createGate, useGate } from 'effector-react'

import { spotsApi, TSpot } from 'api/spots'
import { createGetUserGeolocationFx, MOSCOW_COORDS } from 'features/geolocation'
import { createRequestState } from 'lib/effector-tools'
import type { TMapConfig } from 'components/google-map'
import type { TBounds } from 'types'
import { createReEffect } from 'effector-reeffect'

const DEFAULT_ZOOM = 11
const SPOT_ZOOM = 17

// ===== Basic units =====
const getUserGeolocationFx = createGetUserGeolocationFx()
const getSpotsFx = createReEffect({ handler: spotsApi.getMany, strategy: 'TAKE_LAST' })

const $isGeoReady = createStore(false)
const $areSpotsInitialized = createStore(false)
const $selectedSpotData = createStore<TSpot | null>(null)
const $mapConfig = createStore<TMapConfig>({ center: MOSCOW_COORDS, zoom: DEFAULT_ZOOM })

const spotSelected = createEvent<TSpot>()
const spotDeselected = createEvent()
const mapConfigChanged = createEvent<TMapConfig>()
const viewportChanged = createEvent<TBounds>()

const mapGate = createGate()

// ===== Compound units =====
const $spots = createRequestState(getSpotsFx, (oldSpots, newSpots) => {
  if (!oldSpots) {
    return newSpots
  }

  const oldSpotIds = oldSpots.map(v => v.id)
  // TODO: optimization
  const oldSpotIdsSet = new Set(oldSpotIds)
  const spotsToAdd = (newSpots || []).filter(v => !oldSpotIdsSet.has(v.id))

  return oldSpots.concat(spotsToAdd)
})

const $spotsData = $spots.map(({ data }) => data)
const $areSpotsLoading = $spots.map(({ isLoading }) => isLoading)

const $isMapInitialized = combine($isGeoReady, $areSpotsInitialized, (a, b) => a && b)

// Filter to avoid spot deselection case
const newSpotSelected = $selectedSpotData.updates.filter({ fn: Boolean }) as Event<TSpot>

// ===== Connections =====
$isGeoReady.on(getUserGeolocationFx.done, () => true).reset(mapGate.close)
$areSpotsInitialized.on(getSpotsFx.done, () => true).reset(mapGate.close)
$mapConfig.on(mapConfigChanged, (_, config) => config).reset(mapGate.close)
$selectedSpotData.on(spotSelected, (_, spot) => spot).reset([spotDeselected, mapGate.close])

// Once map mounted, ask user geo
forward({ from: mapGate.open, to: getUserGeolocationFx })

// Center map:
forward({
  from: [
    // On user geo (after loading both GoogleMapApi and user geo)
    getUserGeolocationFx.doneData.map(userCoords => ({ center: userCoords, zoom: DEFAULT_ZOOM })),
    // On marker (after new spot selection)
    newSpotSelected.map(spot => ({ center: spot, zoom: SPOT_ZOOM })),
  ],
  to: mapConfigChanged,
})

forward({ from: viewportChanged, to: getSpotsFx })

export const spotsMapModel = {
  useGate: () => useGate(mapGate),
  signals: {
    mapConfigChanged,
    spotDeselected,
    spotSelected,
    viewportChanged,
  },
  stores: { $spotsData, $isGeoReady, $selectedSpotData, $mapConfig, $isMapInitialized, $areSpotsLoading },
  events: {
    newSpotSelected,
  },
}
