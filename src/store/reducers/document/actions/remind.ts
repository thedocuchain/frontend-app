import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

export const remindUser = createAsyncThunk(
  'user/remind',
  async (
    payload: { userId: string; documentId: string },
    thunkAPI,
  ): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { data } = await api.post(`/v1/documents/${payload.documentId}/users/${payload.userId}/notify`)

      await thunkAPI.dispatch(
        getDocument({
          id: payload.documentId,
        }),
      )
      return data
    } catch (error) {
      console.error(error)
    }
  },
)
