import { Event, createStore, guard, sample, merge, createEvent } from 'effector'
import { forEachObjIndexed } from 'ramda'

type TEventsMap<T> = {
  [K in keyof T]: Event<T[K]>
}

export const combineEvents = <T extends Record<string, unknown>>(eventsMap: TEventsMap<T>) => {
  const allEventsFiredRaw = createEvent<T>()
  const reset = createEvent()

  const $firedEvents = createStore(0)
  $firedEvents.reset([allEventsFiredRaw, reset])

  const $payloads = createStore({} as T)
  $payloads.reset([allEventsFiredRaw, reset])

  forEachObjIndexed((event, eventName) => {
    const $isEventFired = createStore(false).on(event, () => true)
    $isEventFired.reset([allEventsFiredRaw, reset])

    $firedEvents.on($isEventFired, (state, payload) => (payload ? state + 1 : state))
    $payloads.on(event, (state, payload) => ({ ...state, [eventName]: payload }))
  }, eventsMap)

  const events = Object.values(eventsMap)
  const eventFired = sample({ source: $payloads, clock: merge(events) })
  const $allEventsFired = $firedEvents.map(v => v === events.length)

  const allEventsFired = guard({ source: eventFired, filter: $allEventsFired, target: allEventsFiredRaw }) as Event<T>

  return [allEventsFired, reset] as const
}
