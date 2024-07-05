import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getRecaptchaToken } from 'src/store/reducers/document/actions/recaptcha'

export const sendFeedback = createAsyncThunk(
  'feedback/send',
  async (
    payload: {
      email: string
      name: string
      message: string
    },
    thunkAPI,
  ): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { captchaToken } = await thunkAPI.dispatch(getRecaptchaToken('sendform')).unwrap()

      const { data } = await api.post(`/v1/feedbacks`, {
        email: payload.email,
        username: payload.name,
        description: payload.message,
        recaptchaToken: captchaToken,
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)
