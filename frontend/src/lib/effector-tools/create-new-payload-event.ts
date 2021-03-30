import { Event, restore } from 'effector'

export const createNewPayloadEvent = <T>(baseEvent: Event<T>) => restore(baseEvent, null).updates as Event<T>
