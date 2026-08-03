import { createAsyncThunk } from '@reduxjs/toolkit'

import { SuccessApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { ApiErrorPayload, toApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

export type SignDocumentRequest = {
  documentId: string
  userId: string
  readRecordsDislosureAndTerms: boolean
  firstToHear: boolean
  signFont: string
  fontSize: number
  signDate: string // ISO dateTimeString with TZ
  signImage?: string | null
}

type ThunkConfig = { rejectValue: ApiErrorPayload }

export const signDocument = createAsyncThunk<SuccessApiResponse, SignDocumentRequest, ThunkConfig>(
  'document/sign',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post(`/v1/documents/${payload.documentId}/users/${payload.userId}/sign`, {
        readRecordsDisclosure: payload.readRecordsDislosureAndTerms,
        agreedWithPolicy: payload.readRecordsDislosureAndTerms,
        firstToHear: payload.firstToHear,
        signed: true,
        signFont: payload.signFont,
        fontSize: payload.fontSize,
        signDate: payload.signDate,
        signImage: payload.signImage || undefined,
      })

      await thunkAPI.dispatch(
        getDocument({
          id: payload.documentId,
        }),
      )

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiErrorPayload(error))
    }
  },
)
