import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getRecaptchaToken } from 'src/store/reducers/document/actions/recaptcha'

export const sendDocumentNotify = createAsyncThunk(
  'document/send',
  async (payload: { documentId: string }, thunkAPI): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { captchaToken } = await thunkAPI.dispatch(getRecaptchaToken('send_document')).unwrap()

      const { data } = await api.post(`/v1/documents/${payload.documentId}/notify`, {
        recaptchaToken: captchaToken,
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)
