import React from 'react'

import { BaseMarker, Container, Stick, StickContainer } from './styles'

type TProps = React.ComponentProps<typeof BaseMarker>

export const Marker: React.FC<TProps> = props => (
  <Container>
    <BaseMarker {...props} />
    <StickContainer>
      <Stick />
    </StickContainer>
  </Container>
)
