import { settingsSlice, whitelist as settingsWhitelist } from './settings'
import { authSlice, whitelist as authWhitelist } from './auth'
import { toastsSlice, whitelist as toastsWhitelist } from './toasts'

export const whitelist = {
  [settingsSlice.name]: settingsWhitelist,
  [authSlice.name]: authWhitelist,
  [toastsSlice.name]: toastsWhitelist,
}
