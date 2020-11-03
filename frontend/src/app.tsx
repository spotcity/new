import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components'
import { SpotsMap } from 'features/spots'
import { APP_VERSION, GIT_COMMIT } from 'app-constants'

// TODO: Box/Flex containers
export const App = () => {
  const githubCommitUrl = GIT_COMMIT && `https://github.com/spotcity/spotcity/commit/${GIT_COMMIT}`

  return (
    <>
      <VersionBlock>
        <Typography.Description>
          <a href={githubCommitUrl}>version: {APP_VERSION}</a>
        </Typography.Description>
      </VersionBlock>
      <Typography.H1 style={{ display: 'flex', justifyContent: 'center', margin: '8px 0px' }}>Spotcity</Typography.H1>
      <SpotsMap style={{ flexGrow: 1 }} />
    </>
  )
}

const VersionBlock = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  z-index: 1;
  padding: 0px 4px;
`
