import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { AccountSessionItem } from 'src/store/reducers/account/types'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const getAccountSessions = createAsyncThunk<AccountSessionItem[], void, ThunkConfig>(
  'account/get-sessions',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<AccountSessionItem[]>('/v1/account/sessions')

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const revokeAccountSession = createAsyncThunk<void, { id: string }, ThunkConfig>(
  'account/revoke-session',
  async (payload, thunkAPI) => {
    try {
      await api.delete(`/v1/account/sessions/${payload.id}`)
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)
