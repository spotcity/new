import { forward } from 'effector'
import { createReEffect, TAKE_LAST } from 'effector-reeffect'

import { spotsApi } from 'api/spots'
import { createRequestState } from 'lib/effector-tools'

import { spotsMapModel } from '../spots-map'

// ===== Basic units =====
const getSpotFx = createReEffect({ handler: spotsApi.getOne, strategy: TAKE_LAST })

// ===== Compound units =====
const $spot = createRequestState(getSpotFx).map(({ data, isLoading }) => ({ data, isLoading }))

// ===== Connections =====
forward({
  from: spotsMapModel.events.newSpotSelected.map(spot => spot.id),
  to: getSpotFx,
})

export const spotInfoModel = {
  stores: {
    $spot,
  },
}
