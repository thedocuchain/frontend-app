import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { Chains, UserInfo } from 'src/store/reducers/document/types'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { getRecaptchaToken } from 'src/store/reducers/document/actions/recaptcha'

export const addUsersToDocument = createAsyncThunk(
  'document/add-users',
  async (
    payload: {
      id: string
      name: string
      users: UserInfo[]
      blockchain: Chains
    },
    thunkAPI,
  ): Promise<{ documentLink: string } | DefaultApiResponse> => {
    try {
      const { captchaToken } = await thunkAPI.dispatch(getRecaptchaToken('add_recipients')).unwrap()

      const users = payload.users.map((el, index) => ({ ...el, isInitiator: index === 0 }))

      const signers = users.filter((el) => el.role === 'signer').map((el, index) => ({ ...el, position: index + 1 }))
      const watchers = users.filter((el) => el.role === 'watcher').map((el) => ({ ...el, position: 0 }))
      const payloadUsers = [...signers, ...watchers]
      const { data } = await api.patch(`/v1/documents/${payload.id}`, {
        name: payload.name,
        users: payloadUsers,
        blockchain: payload.blockchain,
        recaptchaToken: captchaToken,
      })

      await thunkAPI.dispatch(
        getDocument({
          id: payload.id,
        }),
      )

      return data
    } catch (error) {
      console.error('addUsersToDocument failed:', error?.response?.data ?? error)
      return null
    }
  },
)
