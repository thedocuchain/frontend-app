import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { getRecaptchaToken } from './recaptcha'

export const remindUser = createAsyncThunk(
  'user/remind',
  async (
    payload: { userId: string; documentId: string },
    thunkAPI,
  ): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { captchaToken } = await thunkAPI.dispatch(getRecaptchaToken('send_document')).unwrap()

      const { data } = await api.post(`/v1/documents/${payload.documentId}/users/${payload.userId}/notify`, {
        recaptchaToken: captchaToken,
      })

      await thunkAPI.dispatch(
        getDocument({
          id: payload.documentId,
        }),
      )
      return data
    } catch (ignore) {
      return null
    }
  },
)
