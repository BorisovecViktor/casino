import { useCallback, useMemo, useState } from 'react'

export type UseBooleanOutput = {
  isTrue: boolean
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

export const useBoolean = (initialValue: boolean): UseBooleanOutput => {
  const [isTrue, setIsTrue] = useState(initialValue)

  const setTrue = useCallback(() => {
    setIsTrue(true)
  }, [])

  const setFalse = useCallback(() => {
    setIsTrue(false)
  }, [])

  const toggle = useCallback(() => {
    setIsTrue((previousIsTrue) => !previousIsTrue)
  }, [])

  return useMemo(() => {
    return {
      isTrue,
      setFalse,
      setTrue,
      toggle,
    }
  }, [isTrue, setFalse, setTrue, toggle])
}
