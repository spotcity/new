import styled from 'styled-components'

import { ifElseProp } from 'lib/styled-tools'

const bigMarkerStyles = `
  transform: scale(1.4);
`

const activeMarkerStyles = `
  background: darkred;
  ${bigMarkerStyles}
`

const inactiveMarkerStyles = `
  background: white;

  :hover {
    ${bigMarkerStyles}
  }
`

type TProps = { lat: number; lng: number; isActive?: boolean }

export const BaseMarker = styled.div<TProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 5px solid red;
  transition: transform 0.1s ease-in, background 0.1s ease-in;
  ${ifElseProp('isActive', activeMarkerStyles, inactiveMarkerStyles)}
`

export const Stick = styled.div`
  background: red;
  width: 2px;
  height: 10px;
`

export const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
`

export const StickContainer = styled.div`
  display: flex;
  justify-content: center;
`
