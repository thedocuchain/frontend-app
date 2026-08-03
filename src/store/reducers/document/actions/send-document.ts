import { createAsyncThunk } from '@reduxjs/toolkit'

import { SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const sendDocumentNotify = createAsyncThunk<SuccessApiResponse, { documentId: string }, ThunkConfig>(
  'document/send',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post(`/v1/documents/${payload.documentId}/notify`)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)
