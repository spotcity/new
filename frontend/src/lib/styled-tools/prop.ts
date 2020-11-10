import { isNil } from 'ramda'

export const prop = <Props, PropName extends keyof Props>(propName: PropName, defaultValue?: any) => (props: Props) => {
  const rawResult = props[propName]
  return isNil(rawResult) ? defaultValue : rawResult
}
