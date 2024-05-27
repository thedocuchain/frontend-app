import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'
import { DefaultApiResponse } from 'src/store/reducers/types'

export const uploadDocument = createAsyncThunk(
  'document/upload-file',
  async (payload: {
    file: File
  }): Promise<
    | {
        redirectUrl: string
      }
    | DefaultApiResponse
  > => {
    const fd = new FormData()
    fd.append('file', payload.file)

    const { data } = await api.post('/api/v1/documents/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },
)

export const downloadDocument = createAsyncThunk(
  'document/download-file',
  async (payload: {
    id: string
  }): Promise<
    | {
        file: File
      }
    | DefaultApiResponse
  > => {
    // todo id?
    const { data } = await api.get(`/api/v1/documents/download/${payload.id}`)
    // const { data } = await api.get('/v1/documents/download')

    return data
  },
)
