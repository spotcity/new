import GoogleMapReact from 'google-map-react'
import type { TCoords } from 'types'

export const convertToCoords = (v: GoogleMapReact.Coords): TCoords => ({ latitude: v.lat, longitude: v.lng })
export const convertToGoogleCoords = (v: TCoords): GoogleMapReact.Coords => ({ lat: v.latitude, lng: v.longitude })
