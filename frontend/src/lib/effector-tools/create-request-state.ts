import { createStore, Effect, combine } from 'effector'
import { ReEffect } from 'effector-reeffect'

enum Status {
  Initial,
  Loading,
  Done,
  Fail,
}

type TEffectData<T> = T extends Effect<any, infer D, any> | ReEffect<any, infer D, any> ? D : never
type TDataReducer<T> = (data: TEffectData<T> | null, newData: TEffectData<T> | null) => TEffectData<T> | null

export const createRequestState = <T extends Effect<any, any, any> | ReEffect<any, any, any>>(
  effect: T,
  dataReducer?: TDataReducer<T>,
) => {
  const $status = createStore(Status.Initial)
    .on(effect, () => Status.Loading)
    .on(effect.done, () => Status.Done)
    .on(effect.fail, () => Status.Fail)

  const $data = createStore<TEffectData<T> | null>(null).reset(effect.fail)

  if (!dataReducer) {
    $data.reset(effect).on(effect.doneData, (_, result) => result)
  } else {
    $data.on(effect.doneData, dataReducer)
  }

  const $error = createStore(null)
    .reset(effect)
    .reset(effect.done)
    // TODO: error handling
    .on(effect.fail, (_, { error }) => error)

  const $isInitial = $status.map(v => v === Status.Initial)
  const $isLoading = $status.map(v => v === Status.Loading)
  const $isDone = $status.map(v => v === Status.Done)
  const $isFail = $status.map(v => v === Status.Fail)

  return combine({
    data: $data,
    error: $error,
    isInitial: $isInitial,
    isLoading: $isLoading,
    isDone: $isDone,
    isFail: $isFail,
  })
}
