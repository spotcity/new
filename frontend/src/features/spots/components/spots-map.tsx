import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'

import { Marker, Spinner } from 'components'
import { useDimensions } from 'lib/hooks'
import { GOOGLE_API_KEY } from 'app-constants'

import { $selectedSpot, $spots, getSpotsFx, googleMapApiIsLoaded, spotSelected } from '../model'

import { SpotInfo } from './spot-info'

type TProps = {
  style?: React.CSSProperties
}

const mapOptions = { clickableIcons: false }
const mapKeys = { key: GOOGLE_API_KEY as string }
const defaultMapCenter = { lat: 59.955413, lng: 30.337844 }

export const SpotsMap: React.FC<TProps> = ({ style }) => {
  const { data, isLoading } = useStore($spots)
  const [ref, dimensions] = useDimensions<HTMLDivElement>()
  const selectedSpot = useStore($selectedSpot)

  useEffect(() => {
    getSpotsFx()
  }, [])

  const spinner = isLoading && (
    <Overlay>
      <Spinner />
    </Overlay>
  )

  const markers = data?.map(spot => {
    const { id, latitude, longitude } = spot
    return (
      <Marker
        key={id}
        lat={latitude}
        lng={longitude}
        isActive={id === selectedSpot?.id}
        onClick={() => spotSelected(spot)}
      />
    )
  })

  return (
    <Container style={style} ref={ref}>
      <div style={{ width: dimensions.width, height: dimensions.height }}>
        {dimensions.ready && (
          <GoogleMapReact
            bootstrapURLKeys={mapKeys}
            // TODO: calculate initial center/zoom
            defaultCenter={defaultMapCenter}
            onGoogleApiLoaded={googleMapApiIsLoaded}
            yesIWantToUseGoogleMapApiInternals={true}
            defaultZoom={11}
            options={mapOptions}
          >
            {markers}
          </GoogleMapReact>
        )}
      </div>
      {spinner}
      <SpotInfo id={selectedSpot?.id} />
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
