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
    try {
      const fd = new FormData()
      fd.append('file', payload.file)

      const { data } = await api.post('/api/v1/documents', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)

export const downloadDocument = createAsyncThunk(
  'document/download-file',
  async (payload: {
    id: string
  }): Promise<
    | {
        fileLink: string
      }
    | DefaultApiResponse
  > => {
    try {
      const { data } = await api.get(`/api/v1/documents/${payload.id}/download`)

      return data
    } catch (ignore) {
      return null
    }
  },
)
