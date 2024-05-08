import { Store } from '@reduxjs/toolkit'
import { objectKeys } from '@coxy/utils'

import { getString, setString } from 'src/store/storage'
import { APP_STORAGE_STORE } from 'src/configs/common'

export const restoreStore = () => {
  try {
    return JSON.parse(getString(APP_STORAGE_STORE) || '{}')
  } catch (ignore) {
    return {}
  }
}

type WhitelistState = {
  [k: string]: string[]
}

export const persistStoreWatcher = (store: Store, whitelist: WhitelistState) => {
  if (typeof window === 'undefined') return null

  return store.subscribe(() => {
    const state = store.getState()
    const restate: ReturnType<typeof store.getState> = {}

    objectKeys(state).forEach((storeKey) => {
      restate[storeKey] = { ...state[storeKey] }

      const keys = objectKeys(restate[storeKey])
      keys.forEach((storeItem) => {
        if (!whitelist[storeKey as string]?.includes(storeItem as string)) {
          delete restate[storeKey][storeItem]
        }
      })
    })

    const newState = JSON.stringify(restate)
    if (newState !== getString(APP_STORAGE_STORE)) {
      setString(APP_STORAGE_STORE, newState)
    }
  })
}
