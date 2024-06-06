import { settingsSlice, whitelist as settingsWhitelist } from './settings'
import { authSlice, whitelist as authWhitelist } from './auth'
import { toastsSlice, whitelist as toastsWhitelist } from './toasts'
import { documentSlice, whitelist as documentWhitelist } from './document'
import { signatureSlice, whitelist as signatureWhitelist } from './signature'

export const whitelist = {
  [settingsSlice.name]: settingsWhitelist,
  [authSlice.name]: authWhitelist,
  [toastsSlice.name]: toastsWhitelist,
  [documentSlice.name]: documentWhitelist,
  [signatureSlice.name]: signatureWhitelist,
}
