import { settingsSlice, whitelist as settingsWhitelist } from './settings'
import { authSlice, whitelist as authWhitelist } from './auth'

export const whitelist = {
  [settingsSlice.name]: settingsWhitelist,
  [authSlice.name]: authWhitelist,
}
