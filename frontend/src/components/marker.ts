import styled from 'styled-components'

type TProps = { lat: number; lng: number }

export const Marker = styled.div<TProps>`
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.73);
  transition: transform 0.1s ease-in;

  :hover {
    transform: scale(1.5);
  }
`
