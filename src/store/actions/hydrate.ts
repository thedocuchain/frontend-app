import { createAction } from '@reduxjs/toolkit'

import { CookiesPayload } from 'src/store/constants'
import { AppState, AppStore } from 'src/store'

export const hydrateServer = createAction<AppState>('HYDRATE_SERVER')
export const hydrateCookies = createAction<CookiesPayload>('HYDRATE_COOKIES')
export const hydrateLocalStorage = createAction<AppStore>('HYDRATE_LOCAL_STORAGE')
