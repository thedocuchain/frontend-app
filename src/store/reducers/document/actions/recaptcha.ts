import { createAsyncThunk } from '@reduxjs/toolkit'

import { RECAPTCHA_PUBLIC } from 'configs/api'

export const getRecaptchaToken = createAsyncThunk(
  'reducers/auth/get-recaptcha-token',
  async (action: string): Promise<{ captchaToken: string }> => {
    // eslint-disable-next-line no-console
    console.log(RECAPTCHA_PUBLIC, 'RECAPTCHA_PUBLIC')
    // eslint-disable-next-line no-console
    console.log(process.env.RECAPTCHA_SITE_KEY, 'process.env.RECAPTCHA_SITE_KEY')
    // eslint-disable-next-line no-console
    console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
    const captchaToken: string = await new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_PUBLIC, { action }).then((token) => {
          resolve(token)
        })
      })
    })

    return { captchaToken }
  },
)
