import React, { useCallback, useMemo, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import { mapObjIndexed } from 'ramda'

import { GOOGLE_API_KEY } from 'app-constants'
import type { TBounds, TCoords } from 'types'

import { Marker } from './marker'
import { convertToCoords, convertToGoogleCoords } from './utils'
import type { TMapConfig } from './types'

const mapOptions = { clickableIcons: false }
const mapKeys = { key: GOOGLE_API_KEY as string }

type TProps = {
  zoom: number
  center: TCoords
  onChange?: (config: TMapConfig) => void
  onViewportChange?: (bounds: TBounds) => void
}

export const GoogleMap: React.FC<TProps> & { Marker: typeof Marker } = props => {
  const { children, center, zoom, onChange, onViewportChange } = props
  const convertedCenter = useMemo(() => convertToGoogleCoords(center), [center])
  const initRef = useRef(false)

  const handleChange = useCallback(
    (payload: GoogleMapReact.ChangeEventValue) => {
      const { zoom, bounds, center } = payload
      const isInitializing = !initRef.current
      const viewportBounds = mapObjIndexed(v => convertToCoords(v), bounds)

      onViewportChange?.(viewportBounds)

      if (isInitializing) {
        initRef.current = true
        return
      }

      const newCenter = convertToCoords(center)
      const newMapConfig: TMapConfig = { center: newCenter, zoom }

      onChange?.(newMapConfig)
    },
    [onChange, onViewportChange],
  )

  return (
    <GoogleMapReact
      bootstrapURLKeys={mapKeys}
      center={convertedCenter}
      onChange={handleChange}
      options={mapOptions}
      zoom={zoom}
    >
      {children}
    </GoogleMapReact>
  )
}

GoogleMap.Marker = Marker
