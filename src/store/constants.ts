export enum CookiesTokens {
  language = 'language',
  theme = 'theme',
  accessToken = 'access-token',
}

export type CookiesPayload = Record<CookiesTokens, string>
