import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { AiReview } from 'src/store/reducers/document/types'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const startAiReview = createAsyncThunk<AiReview, { documentId: string }, ThunkConfig>(
  'document/ai-review-start',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post<AiReview>(`/v1/account/documents/${payload.documentId}/ai-review`)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const getAiReview = createAsyncThunk<AiReview | null, { documentId: string }, ThunkConfig>(
  'document/ai-review-get',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.get<AiReview | ''>(`/v1/account/documents/${payload.documentId}/ai-review`)
      return data || null
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)
