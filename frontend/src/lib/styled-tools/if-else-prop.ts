export const ifElseProp = <Props, PropName extends keyof Props = keyof Props>(
  propName: PropName,
  pass?: any,
  fail?: any,
) => (props: Props) => (props[propName] ? pass : fail)
