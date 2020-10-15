import React, { useEffect, useState } from 'react'

type TSpot = {
  geo?: string
  id: number
  name?: string
}

type TResponse = {
  spots: TSpot[]
}

const getSpots = async () =>
  fetch('/api/spots/get/', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(v => v.json() as Promise<TResponse>)
    .then(v => v.spots)

export const App = () => {
  const [spots, setSpots] = useState<TSpot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const fetchSpots = async () => {
    try {
      const newSpots = await getSpots()
      setSpots(newSpots)
    } catch (e) {
      setError('Something went wrong')
      setSpots([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSpots()
  }, [])

  const loadingPlaceholder = isLoading ? 'Loading...' : error

  return (
    <>
      <h1>spots: {loadingPlaceholder}</h1>
      {spots.map(({ id, geo, name }) => (
        <div key={id}>
          <div>id: {id}</div>
          <div>name: {name}</div>
          <div>geo: {geo}</div>
          <hr />
        </div>
      ))}
    </>
  )
}
