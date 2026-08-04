import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { setAccountToken } from 'src/store/reducers/auth'
import { actionUserLogout } from 'src/store/reducers/auth/api'
import { patchAccountState } from 'src/store/reducers/account'
import { AccountInfo } from 'src/store/reducers/account/types'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type AuthResponse = {
  accessToken: string
  account: AccountInfo
}

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const registerAccount = createAsyncThunk<void, { name: string; email: string; password: string }, ThunkConfig>(
  'account/register',
  async (payload, thunkAPI) => {
    try {
      await api.post('/v1/auth/register', payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const verifyAccountEmail = createAsyncThunk<AuthResponse, { email: string; code: string }, ThunkConfig>(
  'account/verify-email',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post<AuthResponse>('/v1/auth/verify-email', payload)

      thunkAPI.dispatch(setAccountToken(data.accessToken))
      thunkAPI.dispatch(patchAccountState({ account: data.account }))

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const resendAccountCode = createAsyncThunk<void, { email: string }, ThunkConfig>(
  'account/resend-code',
  async (payload, thunkAPI) => {
    try {
      await api.post('/v1/auth/resend-code', payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const loginAccount = createAsyncThunk<AuthResponse, { email: string; password: string }, ThunkConfig>(
  'account/login',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post<AuthResponse>('/v1/auth/login', payload)

      thunkAPI.dispatch(setAccountToken(data.accessToken))
      thunkAPI.dispatch(patchAccountState({ account: data.account }))

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const deleteAccount = createAsyncThunk<true, void, ThunkConfig>('account/delete', async (_, thunkAPI) => {
  try {
    await api.delete('/v1/account')
    thunkAPI.dispatch(actionUserLogout())
    return true
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiErrorPayload(error))
  }
})

export const logoutAccount = createAsyncThunk<void, void>('account/logout', async (_, thunkAPI) => {
  try {
    await api.post('/v1/auth/logout')
  } catch (ignore) {
    // The session may already be expired — logging out locally is enough.
  }
  thunkAPI.dispatch(actionUserLogout())
})
