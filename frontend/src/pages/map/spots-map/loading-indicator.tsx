import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { Spinner } from 'components'
import { ifElseProp } from 'lib/styled-tools'

import { spotsMapModel } from './model'

export const LoadingIndicator: React.FC = () => {
  const isLoading = useStore(spotsMapModel.stores.$areSpotsLoading)

  return (
    <Overlay isVisible={isLoading}>
      <Spinner />
    </Overlay>
  )
}

const Overlay = styled.div<{ isVisible: boolean }>`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.2s ease-in;
  opacity: ${ifElseProp('isVisible', 1, 0)};
`
