import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { GoogleMap, Spinner } from 'components'
import { useDimensions } from 'lib/hooks'

import { spotsMapModel } from './model'
import { LoadingIndicator } from './loading-indicator'

type TProps = {
  style?: React.CSSProperties
}

export const SpotsMap: React.FC<TProps> = ({ style }) => {
  const spots = useStore(spotsMapModel.stores.$spotsData)
  const selectedSpotData = useStore(spotsMapModel.stores.$selectedSpotData)
  const mapConfig = useStore(spotsMapModel.stores.$mapConfig)

  const isGeoReady = useStore(spotsMapModel.stores.$isGeoReady)
  const isMapInitialized = useStore(spotsMapModel.stores.$isMapInitialized)

  const [ref, dimensions] = useDimensions<HTMLDivElement>()
  const readyToShowMap = dimensions.ready && isGeoReady

  spotsMapModel.useGate()

  const spinner = !isMapInitialized && (
    <Overlay>
      <Spinner />
    </Overlay>
  )

  const markers = spots?.map(spot => {
    const { id, latitude, longitude } = spot
    return (
      <GoogleMap.Marker
        key={id}
        lat={latitude}
        lng={longitude}
        isActive={id === selectedSpotData?.id}
        onClick={() => spotsMapModel.signals.spotSelected(spot)}
      />
    )
  })

  const map = readyToShowMap && (
    <>
      <GoogleMap
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        onChange={spotsMapModel.signals.mapConfigChanged}
        onViewportChange={spotsMapModel.signals.viewportChanged}
      >
        {markers}
      </GoogleMap>
      <LoadingIndicator />
    </>
  )

  return (
    <Container style={style} ref={ref}>
      <div style={{ width: dimensions.width, height: dimensions.height }}>{map}</div>
      {spinner}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Overlay = styled.div`
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
