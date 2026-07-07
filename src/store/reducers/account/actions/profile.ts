import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { patchAccountState } from 'src/store/reducers/account'
import { AccountInfo } from 'src/store/reducers/account/types'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const getAccount = createAsyncThunk<AccountInfo | null, void>('account/get', async (_, thunkAPI) => {
  try {
    const { data } = await api.get<AccountInfo>('/v1/account')
    thunkAPI.dispatch(patchAccountState({ account: data }))

    return data
  } catch (ignore) {
    return null
  }
})

export const updateAccountProfile = createAsyncThunk<
  AccountInfo,
  { name?: string; avatarImage?: string },
  ThunkConfig
>('account/update-profile', async (payload, thunkAPI) => {
  try {
    const { data } = await api.patch<AccountInfo>('/v1/account', payload)
    thunkAPI.dispatch(patchAccountState({ account: data }))

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiErrorPayload(error))
  }
})

export const updateAccountPassword = createAsyncThunk<
  void,
  { currentPassword: string; password: string },
  ThunkConfig
>('account/update-password', async (payload, thunkAPI) => {
  try {
    await api.patch('/v1/account/password', payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiErrorPayload(error))
  }
})

export const sendPasswordResetCode = createAsyncThunk<void, void, ThunkConfig>(
  'account/send-password-reset-code',
  async (_, thunkAPI) => {
    try {
      await api.post('/v1/account/password-reset/send')
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const confirmPasswordReset = createAsyncThunk<void, { code: string; password: string }, ThunkConfig>(
  'account/confirm-password-reset',
  async (payload, thunkAPI) => {
    try {
      await api.post('/v1/account/password-reset/confirm', payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const sendSupportTicket = createAsyncThunk<void, { title: string; text: string }, ThunkConfig>(
  'account/send-support-ticket',
  async (payload, thunkAPI) => {
    try {
      await api.post('/v1/account/support', payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const saveAccountSignature = createAsyncThunk<
  AccountInfo,
  { signImage?: string; signFont?: string },
  ThunkConfig
>('account/save-signature', async (payload, thunkAPI) => {
  try {
    const { data } = await api.put<AccountInfo>('/v1/account/signature', payload)
    thunkAPI.dispatch(patchAccountState({ account: data }))

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiErrorPayload(error))
  }
})
