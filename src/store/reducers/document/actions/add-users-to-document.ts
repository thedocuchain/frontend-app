import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { Chains, UserInfo } from 'src/store/reducers/document/types'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const addUsersToDocument = createAsyncThunk<
  { documentLink?: string },
  {
    id: string
    name: string
    users: UserInfo[]
    blockchain: Chains
  },
  ThunkConfig
>('document/add-users', async (payload, thunkAPI) => {
  try {
    const users = payload.users.map((el, index) => ({ ...el, isInitiator: index === 0 }))

    const signers = users.filter((el) => el.role === 'signer').map((el, index) => ({ ...el, position: index + 1 }))
    const watchers = users.filter((el) => el.role === 'watcher').map((el) => ({ ...el, position: 0 }))
    const payloadUsers = [...signers, ...watchers]
    const { data } = await api.patch(`/v1/documents/${payload.id}`, {
      name: payload.name,
      users: payloadUsers,
      blockchain: payload.blockchain,
    })

    await thunkAPI.dispatch(
      getDocument({
        id: payload.id,
      }),
    )

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiErrorPayload(error))
  }
})
