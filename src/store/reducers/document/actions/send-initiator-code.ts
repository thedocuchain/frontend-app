import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { getRecaptchaToken } from 'src/store/reducers/document/actions/recaptcha'

export const sendInitiatorCode = createAsyncThunk(
  'document/send-initiator-code',
  async (payload: { documentId: string }, thunkAPI): Promise<{ ok: boolean; tooMany: boolean }> => {
    try {
      const { captchaToken } = await thunkAPI.dispatch(getRecaptchaToken('verify_initiator')).unwrap()

      await api.post(`/v1/documents/${payload.documentId}/verify-initiator/send`, {
        recaptchaToken: captchaToken,
      })

      return { ok: true, tooMany: false }
    } catch (error) {
      return { ok: false, tooMany: error?.response?.status === 429 }
    }
  },
)
