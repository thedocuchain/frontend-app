import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export const subscribeUser = createAsyncThunk(
  'user/subscribe',
  async (payload: { documentId: string; userEmail: string }): Promise<SuccessApiResponse | DefaultApiResponse> => {
    const { data } = await api.post(`/api/v1/users/subscribe`, {
      documentId: payload.documentId,
      userEmail: payload.userEmail,
    })

    return data
  },
)
