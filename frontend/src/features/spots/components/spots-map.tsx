import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'

import { Marker, Spinner } from 'components'
import { useDimensions } from 'lib/hooks'
import { GOOGLE_API_KEY } from 'app-constants'

import { $spots, getSpotsFx, googleMapApiIsLoaded, spotSelected } from '../model'

import { SpotInfo } from './spot-info'

type TProps = {
  style?: React.CSSProperties
}

export const SpotsMap: React.FC<TProps> = ({ style }) => {
  const { data, isLoading } = useStore($spots)
  const [ref, dimensions] = useDimensions<HTMLDivElement>()

  useEffect(() => {
    getSpotsFx()
  }, [])

  const spinner = isLoading && (
    <Overlay>
      <Spinner />
    </Overlay>
  )

  return (
    <Container style={style} ref={ref}>
      <div style={{ width: dimensions.width, height: dimensions.height }}>
        {dimensions.ready && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_API_KEY as string }}
            // TODO: calculate initial center/zoom
            center={{ lat: 59.955413, lng: 30.337844 }}
            onGoogleApiLoaded={googleMapApiIsLoaded}
            yesIWantToUseGoogleMapApiInternals={true}
            zoom={11}
          >
            {data?.map(({ id, latitude, longitude }) => (
              <Marker key={id} lat={latitude} lng={longitude} onClick={() => spotSelected(id)} />
            ))}
          </GoogleMapReact>
        )}
      </div>
      {spinner}
      <SpotInfo />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
