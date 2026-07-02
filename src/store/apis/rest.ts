import axios from 'axios'
import { Store } from '@reduxjs/toolkit'

import { selectedAccessToken } from 'src/store/reducers/auth'
import { VERSION } from 'src/configs/version'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.docuchain.io/'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-app-version': VERSION,
    'x-app-lang': 'en',
    'Authorization': undefined,
  },
  timeout: 30000,
})

// hack for remove circular dependencies
let locallyStore: Store = null

export function __setApiStore(store: Store) {
  locallyStore = store
}

api.interceptors.request.use((config) => {
  const state = locallyStore.getState()
  config.headers.Authorization = `Bearer ${selectedAccessToken(state)}`

  return config
})
