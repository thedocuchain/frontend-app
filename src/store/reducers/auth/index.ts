import type { AppState } from 'src/store'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteCookie, setCookie } from 'cookies-next'
import { objectKeys } from '@coxy/utils'

import { actionUserLogout } from 'src/store/reducers/auth/api'
import { hydrateCookies } from 'src/store/actions/hydrate'
import { CookiesPayload, CookiesTokens } from 'src/store/constants'

export const storeKey = '@redux/auth'

const ACCOUNT_TOKEN_MAX_AGE = 30 * 24 * 3600

export interface AuthState {
  accessToken: string
  accountToken: string
}

const initialState: AuthState = {
  accessToken: '',
  accountToken: '',
}

export const whitelist = objectKeys(initialState)

export const authSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    setAccessToken: (state: AuthState, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      if (action.payload) {
        setCookie(CookiesTokens.accessToken, action.payload)
      } else {
        deleteCookie(CookiesTokens.accessToken)
      }
    },
    setAccountToken: (state: AuthState, action: PayloadAction<string>) => {
      state.accountToken = action.payload
      if (action.payload) {
        setCookie(CookiesTokens.accountToken, action.payload, { maxAge: ACCOUNT_TOKEN_MAX_AGE })
      } else {
        deleteCookie(CookiesTokens.accountToken)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateCookies, (state: AuthState, action: PayloadAction<CookiesPayload>) => {
      state.accessToken = action.payload[CookiesTokens.accessToken]
      state.accountToken = action.payload[CookiesTokens.accountToken] ?? ''
    })

    builder.addCase(actionUserLogout, (state: AuthState) => {
      state.accountToken = ''
      deleteCookie(CookiesTokens.accountToken)
    })
  },
})

export const { setAccessToken, setAccountToken } = authSlice.actions

export const selectedAccessToken = (state: AppState) => state[storeKey].accessToken
export const selectedAccountToken = (state: AppState) => state[storeKey].accountToken
