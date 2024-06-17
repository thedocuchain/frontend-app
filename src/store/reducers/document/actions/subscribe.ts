import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

export const subscribeDocument = createAsyncThunk(
  'document/subscribe',
  async (
    payload: { documentId: string; userEmail: string },
    thunkAPI,
  ): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { data } = await api.post(`/v1/documents/${payload.documentId}/subscribe`, {
        email: payload.userEmail,
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
