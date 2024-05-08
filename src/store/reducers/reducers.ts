import { settingsSlice } from './settings'
import { authSlice } from './auth'

export const reducers = {
  [settingsSlice.name]: settingsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
}

export const slices = {
  [settingsSlice.name]: settingsSlice,
  [authSlice.name]: authSlice,
}
