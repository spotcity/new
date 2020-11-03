export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
export const GIT_COMMIT = process.env.REACT_APP_COMMIT
const GIT_REF = process.env.REACT_APP_REF

const getAppVersion = () => {
  if (!GIT_COMMIT || !GIT_REF) {
    return 'unknown'
  }

  return `${GIT_REF}.${GIT_COMMIT.substring(0, 7)}`
}

export const APP_VERSION = getAppVersion()
