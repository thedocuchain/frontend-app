import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export const sendFeedback = createAsyncThunk(
  'feedback/send',
  async (payload: {
    email: string
    name: string
    message: string
  }): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { data } = await api.post(`/v1/feedback`, {
        email: payload.email,
        name: payload.name,
        message: payload.message,
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)
