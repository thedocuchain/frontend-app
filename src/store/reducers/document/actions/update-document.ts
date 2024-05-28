import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { UserInfo } from 'src/store/reducers/document/types'

export const addUsersToDocument = createAsyncThunk(
  'document/add-users',
  async (payload: {
    id: string
    name: string
    users: UserInfo[]
  }): Promise<{ documentLink: string } | DefaultApiResponse> => {
    try {
      const { data } = await api.patch(`/api/v1/documents/${payload.id}`, { name: payload.name, users: payload.users })

      return data
    } catch (ignore) {
      return null
    }
  },
)
