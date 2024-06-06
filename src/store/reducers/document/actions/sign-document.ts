import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export type SignDocumentRequest = {
  documentId: string
  userId: string
  agreedWithPolicy: boolean
  readRecordsDislosure: boolean
  signFont: string
  fontSize: 20
  signDate: string // ISO dateTimeString with TZ,
}

export const signDocument = createAsyncThunk(
  'document/sign',
  async (payload: SignDocumentRequest): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { data } = await api.put(`/api/v1/documents/${payload.documentId}/users/${payload.userId}/sign`, {
        agreedWithPolicy: payload.agreedWithPolicy,
        readRecordsDislosure: payload.readRecordsDislosure,
        signed: true,
        signFont: payload.signFont,
        fontSize: payload.fontSize,
        signDate: payload.signDate,
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)
