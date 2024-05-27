import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { User } from 'src/store/reducers/document/types'

export const updateUser = createAsyncThunk(
  'user/update',
  async (payload: { user: Partial<User> }): Promise<User | DefaultApiResponse> => {
    try {
      const { data } = await api.patch(`/api/v1/users/${payload.user.id}`, payload.user)

      return data
    } catch (ignore) {
      return null
    }
  },
)
