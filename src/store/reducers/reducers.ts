import { settingsSlice } from './settings'
import { authSlice } from './auth'
import { toastsSlice } from './toasts'
import { documentSlice } from './document'

export const reducers = {
  [settingsSlice.name]: settingsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [toastsSlice.name]: toastsSlice.reducer,
  [documentSlice.name]: documentSlice.reducer,
}

export const slices = {
  [settingsSlice.name]: settingsSlice,
  [authSlice.name]: authSlice,
  [toastsSlice.name]: toastsSlice,
  [documentSlice.name]: documentSlice,
}
