export enum CookiesTokens {
  language = 'language',
  theme = 'theme',
  accessToken = 'access-token',
  accountToken = 'account-token',
}

export type CookiesPayload = Record<CookiesTokens, string>
