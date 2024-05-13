import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setCookie } from 'cookies-next'
import { objectKeys } from '@coxy/utils'

import { AppState } from 'src/store'
import { DEFAULT_LANG } from 'src/configs/common'
import { localizations } from 'src/configs/localizations'
import { CookiesPayload, CookiesTokens } from 'src/store/constants'
import { hydrateCookies, hydrateLocalStorage } from 'src/store/actions/hydrate'
import patchStateReducer from 'src/store/utils/patch-state'

import { Language } from './types'

const storeKey = '@redux/settings'

export interface SettingsState {
  theme: undefined | string
  language: undefined | Language
}

const initialState: SettingsState = {
  theme: undefined,
  language: undefined,
}

export const whitelist = objectKeys(initialState)

export const settingsSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    patchSettingsState: (state, action: PayloadAction<Partial<SettingsState>>) => {
      patchStateReducer(state, action)
    },
    toggleTheme: (state: SettingsState) => {
      if (state.theme === 'dark') {
        document.body.classList.remove('dark')
        setCookie(CookiesTokens.theme, 'white')
        state.theme = 'white'
      } else {
        document.body.classList.add('dark')
        setCookie(CookiesTokens.theme, 'dark')
        state.theme = 'dark'
      }
    },
    setTheme: (state: SettingsState, action: PayloadAction<'dark' | 'white'>) => {
      document.body.classList.remove('dark')
      setCookie(CookiesTokens.theme, action.payload)
      state.theme = action.payload
      if (action.payload === 'dark') {
        document.body.classList.add('dark')
      }
    },
    setLanguage: (state: SettingsState, action: PayloadAction<Language>) => {
      state.language = action.payload
      setCookie(CookiesTokens.language, action.payload.code)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateCookies, (state: SettingsState, action: PayloadAction<CookiesPayload>) => {
      state.language = localizations.find((el) => el.code === action.payload.language) || DEFAULT_LANG
      state.theme = action.payload[CookiesTokens.theme] || 'white'
    })

    builder.addCase(hydrateLocalStorage, (state: SettingsState, action: PayloadAction<AppState>) => {
      Object.assign(state, { ...state, ...(action.payload[storeKey] || {}) })
    })
  },
})

export const { setLanguage, toggleTheme, setTheme, patchSettingsState } = settingsSlice.actions

export const selectSettingState = (state: AppState) => state[storeKey] as SettingsState
export const selectedLanguage = (state: AppState): Language => state[storeKey].language
export const selectedDefaultLanguage = (): Language => localizations[0]
export const selectedTheme = (state: AppState) => state[storeKey].theme || 'white'
