import { useState } from 'react'
import { TBetHistoryRow } from 'app/slices/game'

export const useLocalStorage = (
  keyName: string,
  defaultValue: string | null | number | Array<TBetHistoryRow>,
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue))

        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (
    newValue: string | null | number | Array<TBetHistoryRow>,
  ) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
      console.log(err)
    }

    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
