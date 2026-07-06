import axios from 'axios'
import { Store } from '@reduxjs/toolkit'

import { selectedAccessToken, selectedAccountToken } from 'src/store/reducers/auth'
import { actionUserLogout } from 'src/store/reducers/auth/api'
import { VERSION } from 'src/configs/version'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.docuchain.io/'

const ACCOUNT_API_PREFIXES = ['/v1/account', '/v1/auth']

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

const isAccountApiUrl = (url?: string) => ACCOUNT_API_PREFIXES.some((prefix) => url?.startsWith(prefix))

api.interceptors.request.use((config) => {
  const state = locallyStore.getState()
  const token = isAccountApiUrl(config.url) ? selectedAccountToken(state) : selectedAccessToken(state)
  config.headers.Authorization = `Bearer ${token}`

  return config
})

api.interceptors.response.use(undefined, (error) => {
  const url: string = error?.config?.url ?? ''
  if (url.startsWith('/v1/account') && error?.response?.status === 401 && typeof window !== 'undefined') {
    locallyStore.dispatch(actionUserLogout())
    window.location.href = '/app/login'
  }

  return Promise.reject(error)
})
