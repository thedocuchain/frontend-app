import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export const getDocumentLinkByShortId = createAsyncThunk(
  'document/get-link-by-short-id',
  async (payload: {
    shortId: string
  }): Promise<
    | {
        redirectUrl: string
      }
    | DefaultApiResponse
  > => {
    try {
      const { data } = await api.get(`/v1/documents/status`, {
        params: { shortId: payload.shortId },
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)
