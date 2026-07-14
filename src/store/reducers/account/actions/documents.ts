import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { patchAccountState, selectedAccountDocuments } from 'src/store/reducers/account'
import { AccountDocumentItem } from 'src/store/reducers/account/types'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const getAccountDocuments = createAsyncThunk<AccountDocumentItem[] | null, void>(
  'account/get-documents',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<AccountDocumentItem[]>('/v1/account/documents')
      thunkAPI.dispatch(patchAccountState({ documents: data }))

      return data
    } catch (ignore) {
      return null
    }
  },
)

export const uploadAccountDocument = createAsyncThunk<{ redirectUrl?: string }, { file: File }, ThunkConfig>(
  'account/upload-document',
  async (payload, thunkAPI) => {
    try {
      const fd = new FormData()
      fd.append('file', payload.file)

      const { data } = await api.post<{ redirectUrl?: string }>('/v1/account/documents', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const markAccountDocumentSeen = createAsyncThunk<void, { id: string }>(
  'account/mark-document-seen',
  async (payload, thunkAPI) => {
    const documents = selectedAccountDocuments(thunkAPI.getState() as never)
    if (documents?.some((document) => document.id === payload.id && document.isNew)) {
      thunkAPI.dispatch(
        patchAccountState({
          documents: documents.map((document) =>
            document.id === payload.id ? { ...document, isNew: false } : document,
          ),
        }),
      )
    }

    try {
      await api.post(`/v1/account/documents/${payload.id}/seen`)
    } catch (ignore) {
      // Non-critical — the badge will be recalculated on the next load.
    }
  },
)

export const reportAccountDocument = createAsyncThunk<void, { id: string }, ThunkConfig>(
  'account/report-document',
  async (payload, thunkAPI) => {
    try {
      await api.post(`/v1/account/documents/${payload.id}/report`)
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)

export const getAccountSignLink = createAsyncThunk<
  { userId: string; token: string; expiredAt: number },
  { id: string },
  ThunkConfig
>('account/get-sign-link', async (payload, thunkAPI) => {
  try {
    const { data } = await api.get<{ userId: string; token: string; expiredAt: number }>(
      `/v1/account/documents/${payload.id}/sign-link`,
    )

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiErrorPayload(error))
  }
})
