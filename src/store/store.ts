import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { objectKeys } from '@coxy/utils'

import { reducers, slices } from 'src/store/reducers/reducers'
import { listenerMiddleware } from 'src/store/listening'
import { thunkMiddleware } from 'src/store/utils/thunk'
import { persistStoreWatcher, restoreStore } from 'src/store/utils/persist'
import { whitelist } from 'src/store/reducers/whitelist'
import { __setApiStore } from 'src/store/apis'
import { AppState, type AppStore } from 'src/store/index'
import { hydrateLocalStorage } from 'src/store/actions/hydrate'
import { clearMemory } from 'src/store/storage'

export let store

export const createLocalStore = (initialStore) => {
  const preloadedState = { ...initialStore } as AppState

  const logger = createLogger({ collapsed: true })

  const middleware = [listenerMiddleware.middleware, thunkMiddleware]
  if (typeof window === 'undefined') {
    clearMemory()
  }

  if (typeof window !== 'undefined') {
    if (store) return store

    // restore initial state
    objectKeys(initialStore).forEach((storeKey: keyof typeof reducers) => {
      const initialStoreData = slices?.[storeKey]?.getInitialState() || {}
      const currentBackendState = preloadedState[storeKey]

      objectKeys(initialStoreData).forEach((initialKey) => {
        if (currentBackendState[initialKey] === undefined) {
          currentBackendState[initialKey] = initialStoreData[initialKey]
        }
      })
    })

    // patch server store data with localStorage data
    middleware.push(logger)
  }

  store = configureStore({
    reducer: reducers,
    middleware,
    preloadedState,
  })

  store.dispatch(hydrateLocalStorage(restoreStore() as AppStore))

  persistStoreWatcher(store, whitelist)
  __setApiStore(store)

  return store
}
