import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components'
import { APP_VERSION, GIT_COMMIT } from 'app-constants'
import { MapPage } from 'pages'

const githubCommitUrl = GIT_COMMIT && `https://github.com/spotcity/spotcity/commit/${GIT_COMMIT}`

// TODO: Box/Flex containers
export const App = () => (
  <>
    <MapPage />
    <VersionBlock>
      <Typography.Description>
        <a href={githubCommitUrl}>version: {APP_VERSION}</a>
      </Typography.Description>
    </VersionBlock>
  </>
)

const VersionBlock = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  z-index: 1;
  padding: 0 4px;
`
