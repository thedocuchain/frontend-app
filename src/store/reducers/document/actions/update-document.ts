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
    const { data } = await api.put(`/v1/documents/${payload.id}`, { name: payload.name, users: payload.users })

    return data
  },
)
