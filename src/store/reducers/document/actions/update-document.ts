import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export const updateDocument = createAsyncThunk(
  'document/update',
  async (payload: {
    id: string
    name: string
    users: { name?: string; email: string; roleId: string }[]
  }): Promise<{ documentLink: string } | DefaultApiResponse> => {
    try {
      const { data } = await api.patch(`/api/v1/documents/${payload.id}`, { name: payload.name, users: payload.users })

      return data
    } catch (ignore) {
      return null
    }
  },
)
