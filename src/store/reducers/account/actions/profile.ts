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
