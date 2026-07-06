import { settingsSlice } from './settings'
import { authSlice } from './auth'
import { toastsSlice } from './toasts'
import { documentSlice } from './document'
import { signatureSlice } from './signature'
import { accountSlice } from './account'

export const reducers = {
  [settingsSlice.name]: settingsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [toastsSlice.name]: toastsSlice.reducer,
  [documentSlice.name]: documentSlice.reducer,
  [signatureSlice.name]: signatureSlice.reducer,
  [accountSlice.name]: accountSlice.reducer,
}

export const slices = {
  [settingsSlice.name]: settingsSlice,
  [authSlice.name]: authSlice,
  [toastsSlice.name]: toastsSlice,
  [documentSlice.name]: documentSlice,
  [signatureSlice.name]: signatureSlice,
  [accountSlice.name]: accountSlice,
}
