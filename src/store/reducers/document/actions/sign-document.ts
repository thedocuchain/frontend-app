import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'

export type SignDocumentRequest = {
  documentId: string
  signatureId: string
  userId: string
  agreedWithPolicy: boolean
  readRecordsDislosure: boolean
  firstToHear: boolean
  signed: boolean
  signDate: string // ISO dateTimeString with TZ,
}

export const signDocument = createAsyncThunk(
  'document/sign',
  async (payload: SignDocumentRequest): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { data } = await api.put(`/api/v1/documents/${payload.documentId}/signatures/${payload.signatureId}`, {
        userId: payload.userId,
        agreedWithPolicy: payload.agreedWithPolicy,
        readRecordsDislosure: payload.readRecordsDislosure,
        firstToHear: payload.firstToHear,
        signed: payload.signed,
        signDate: payload.signDate,
      })

      return data
    } catch (ignore) {
      return null
    }
  },
)
