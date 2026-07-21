import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const getReminderSubscription = createAsyncThunk<{ unsubscribed: boolean }, void, ThunkConfig>(
  'account/get-reminder-subscription',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<{ unsubscribed: boolean }>('/v1/account/reminders/subscription')

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const unsubscribeReminders = createAsyncThunk<void, void, ThunkConfig>(
  'account/unsubscribe-reminders',
  async (_, thunkAPI) => {
    try {
      await api.post('/v1/account/reminders/unsubscribe')
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const resubscribeReminders = createAsyncThunk<void, void, ThunkConfig>(
  'account/resubscribe-reminders',
  async (_, thunkAPI) => {
    try {
      await api.post('/v1/account/reminders/resubscribe')
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)
