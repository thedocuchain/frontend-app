import { createAsyncThunk } from '@reduxjs/toolkit'

import { DefaultApiResponse, SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

export type SignDocumentRequest = {
  documentId: string
  userId: string
  readRecordsDislosure: boolean
  signFont: string
  fontSize: number
  signDate: string // ISO dateTimeString with TZ
}

export const signDocument = createAsyncThunk(
  'document/sign',
  async (payload: SignDocumentRequest, thunkAPI): Promise<SuccessApiResponse | DefaultApiResponse> => {
    try {
      const { data } = await api.post(`/api/v1/documents/${payload.documentId}/users/${payload.userId}/sign`, {
        readRecordsDislosure: payload.readRecordsDislosure,
        // todo agreedWithPolicy and readRecordsDisclosure
        agreedWithPolicy: true,
        readRecordsDisclosure: true,
        signed: true,
        signFont: payload.signFont,
        fontSize: payload.fontSize,
        signDate: payload.signDate,
      })

      await thunkAPI.dispatch(
        getDocument({
          id: payload.documentId,
        }),
      )

      return data
    } catch (ignore) {
      return null
    }
  },
)
