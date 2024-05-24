import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export const remindUser = createAsyncThunk(
  'user/remind',
  async (payload: {
    userId: string
    documentId: string
    signatureId: string
  }): Promise<SuccessApiResponse | DefaultApiResponse> => {
    const { data } = await api.post(`/v1/users/${payload.userId}/remind`, {
      documentId: payload.documentId,
      signatureId: payload.signatureId,
    })

    return data
  },
)
