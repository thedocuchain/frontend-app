import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { BillingStatus } from 'src/store/reducers/account/types'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const getBillingStatus = createAsyncThunk<BillingStatus | null, void>(
  'account/billing-status',
  async () => {
    try {
      const { data } = await api.get<BillingStatus>('/v1/account/billing')
      return data
    } catch (ignore) {
      return null
    }
  },
)

export const startCheckout = createAsyncThunk<
  { url: string },
  { plan: 'pro' | 'pro_max'; interval: 'month' | 'year' },
  ThunkConfig
>(
  'account/billing-checkout',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post<{ url: string }>('/v1/account/billing/checkout', payload)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const openBillingPortal = createAsyncThunk<{ url: string }, void, ThunkConfig>(
  'account/billing-portal',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.post<{ url: string }>('/v1/account/billing/portal')
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)
