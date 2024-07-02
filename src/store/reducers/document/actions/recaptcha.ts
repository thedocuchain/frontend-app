import { createAsyncThunk } from '@reduxjs/toolkit'

import { RECAPTCHA_SITE_KEY } from 'configs/api'

export const getRecaptchaToken = createAsyncThunk(
  'reducers/auth/get-recaptcha-token',
  async (action: string): Promise<{ captchaToken: string }> => {
    const captchaToken: string = await new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then((token) => {
          resolve(token)
        })
      })
    })

    return { captchaToken }
  },
)
