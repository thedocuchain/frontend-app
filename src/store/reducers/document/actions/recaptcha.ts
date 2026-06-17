import { createAsyncThunk } from '@reduxjs/toolkit'

import { RECAPTCHA_PUBLIC } from 'configs/api'

const RECAPTCHA_TIMEOUT_MS = 10000
const RECAPTCHA_UNAVAILABLE = 'recaptcha-unavailable'

export const getRecaptchaToken = createAsyncThunk(
  'reducers/auth/get-recaptcha-token',
  async (action: string): Promise<{ captchaToken: string }> => {
    if (!RECAPTCHA_PUBLIC || typeof grecaptcha === 'undefined') {
      return { captchaToken: RECAPTCHA_UNAVAILABLE }
    }

    try {
      const captchaToken: string = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('reCAPTCHA timeout')), RECAPTCHA_TIMEOUT_MS)

        grecaptcha.ready(() => {
          grecaptcha.execute(RECAPTCHA_PUBLIC, { action }).then(
            (token) => {
              clearTimeout(timer)
              resolve(token)
            },
            (error) => {
              clearTimeout(timer)
              reject(error)
            },
          )
        })
      })

      return { captchaToken }
    } catch {
      return { captchaToken: RECAPTCHA_UNAVAILABLE }
    }
  },
)
