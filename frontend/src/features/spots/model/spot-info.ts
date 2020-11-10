import { createEvent, createStore, Event } from 'effector'
import { createReEffect, TAKE_LAST } from 'effector-reeffect'

import { createRequestState } from 'lib/effector-tools'

import * as api from '../api'
import type { TSpot } from '../types'

const getSpotFx = createReEffect({ handler: api.getSpot, strategy: TAKE_LAST })

const spotSelected = createEvent<TSpot>()
const spotInfoClosed = createEvent()

const $spot = createRequestState(getSpotFx).map(({ data, isLoading }) => ({ data, isLoading }))
const $selectedSpot = createStore<TSpot | null>(null)

const anotherSpotSelected = $selectedSpot.updates.filter({ fn: Boolean }) as Event<TSpot>

$selectedSpot.on(spotSelected, (_, spot) => spot).reset(spotInfoClosed)

anotherSpotSelected.watch(spot => getSpotFx(spot.id))

export { $selectedSpot, $spot, anotherSpotSelected, spotInfoClosed, spotSelected }
