import { Event, createStore, guard, sample, merge, createEvent } from 'effector'
import { forEachObjIndexed } from 'ramda'

type TEventMap = {
  [K: string]: Event<any>
}

type TPayloadsMap<T extends TEventMap> = {
  [K in keyof T]: Parameters<T[K]>[0]
}

export const combineEvents = <T extends TEventMap>(eventsMap: T, repeatable: boolean = true) => {
  const $firedEvents = createStore(0)
  const $payloads = createStore({} as TPayloadsMap<T>)
  const allEventsFired = createEvent<TPayloadsMap<T>>()

  if (repeatable) {
    $firedEvents.reset(allEventsFired)
    $payloads.reset(allEventsFired)
  } else {
    $firedEvents.on(allEventsFired, state => state + 1)
  }

  forEachObjIndexed((event, eventName) => {
    const $isEventFired = createStore(false).on(event, () => true)

    if (repeatable) {
      $isEventFired.reset(allEventsFired)
    }

    $firedEvents.on($isEventFired, (state, payload) => (payload ? state + 1 : state))
    $payloads.on(event, (state, payload) => ({ ...state, [eventName]: payload }))
  }, eventsMap)

  const events = Object.values(eventsMap)
  const eventFired = sample({ source: $payloads, clock: merge(events) })
  const $allEventsFired = $firedEvents.map(v => v === events.length)

  return guard({ source: eventFired, filter: $allEventsFired, target: allEventsFired }) as Event<TPayloadsMap<T>>
}
