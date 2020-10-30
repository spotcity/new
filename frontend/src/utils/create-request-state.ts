import { createStore, Effect } from 'effector'

enum Status {
  Initial,
  Loading,
  Done,
  Fail,
}

type TEffectData<T> = T extends Effect<any, infer D, any> ? D : never

export const createRequestState = <T extends Effect<any, any, any>>(effect: T) => {
  const $status = createStore(Status.Initial)
    .on(effect, () => Status.Loading)
    .on(effect.done, () => Status.Done)
    .on(effect.fail, () => Status.Fail)

  const $data = createStore<TEffectData<T> | null>(null)
    .reset(effect)
    .reset(effect.fail)
    .on(effect.done, (_, { result }) => result)

  const $error = createStore(null)
    .reset(effect)
    .reset(effect.done)
    // TODO: error handling
    .on(effect.fail, (_, { error }) => error)

  const $isInitial = $status.map(v => v === Status.Initial)
  const $isLoading = $status.map(v => v === Status.Loading)
  const $isDone = $status.map(v => v === Status.Done)
  const $isFail = $status.map(v => v === Status.Fail)

  return {
    $data,
    $error,
    $isInitial,
    $isLoading,
    $isDone,
    $isFail,
  }
}
