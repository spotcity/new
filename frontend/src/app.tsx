import React from 'react'

import { Typography } from 'components'
import { SpotsMap } from 'features/spots'

// TODO: Box/Flex containers
export const App = () => (
  <>
    <Typography.H1 style={{ display: 'flex', justifyContent: 'center', margin: '8px 0px' }}>Spotcity</Typography.H1>
    <SpotsMap style={{ flexGrow: 1 }} />
  </>
)
