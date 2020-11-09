import { useLayoutEffect, useRef, useState } from 'react'

type TState = {
  ready: boolean
  width?: number
  height?: number
}

const initialState: TState = {
  ready: false,
  width: undefined,
  height: undefined,
}

export const useDimensions = <T extends HTMLElement>(deps: any[] = []) => {
  const targetRef = useRef<T>(null)
  const [state, setState] = useState(initialState)

  const measureTarget = () => {
    if (targetRef.current) {
      const { width, height } = targetRef.current.getBoundingClientRect()
      const areDimensionsChanged = state.width !== width || state.height !== height

      if (areDimensionsChanged) {
        setState({ width, height, ready: true })
      }
    }
  }

  useLayoutEffect(() => {
    measureTarget()
    window.addEventListener('resize', measureTarget)

    return () => {
      window.removeEventListener('resize', measureTarget)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [targetRef, state] as const
}
