import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { UserInfo } from 'src/store/reducers/document/types'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

export const addUsersToDocument = createAsyncThunk(
  'document/add-users',
  async (
    payload: {
      id: string
      name: string
      users: UserInfo[]
    },
    thunkAPI,
  ): Promise<{ documentLink: string } | DefaultApiResponse> => {
    try {
      const signers = payload.users
        .filter((el) => el.role === 'signer')
        .map((el, index) => ({ ...el, position: index + 1 }))
      const watchers = payload.users.filter((el) => el.role === 'watcher').map((el) => ({ ...el, position: 0 }))
      const payloadUsers = [...signers, ...watchers]
      const { data } = await api.patch(`/api/v1/documents/${payload.id}`, { name: payload.name, users: payloadUsers })

      await thunkAPI.dispatch(
        getDocument({
          id: payload.id,
        }),
      )

      return data
    } catch (ignore) {
      return null
    }
  },
)
