import React from 'react'

import { Typography } from 'components'

import { SpotInfo } from './spot-info'
import { SpotsMap } from './spots-map'

export const MapPage = () => (
  <>
    <Typography.H1 style={{ display: 'flex', justifyContent: 'center', margin: '8px 0px' }}>Spotcity</Typography.H1>
    <SpotsMap style={{ flexGrow: 1 }} />
    <SpotInfo />
  </>
)
