import { createAsyncThunk } from '@reduxjs/toolkit'

import { DocumentType } from 'src/store/reducers/document/types'
import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { patchDocumentState } from 'src/store/reducers/document'

export const getDocumentByUser = createAsyncThunk(
  'document/get-by-user',
  async (payload: { documentId: string; userId: string }, thunkAPI): Promise<DocumentType | DefaultApiResponse> => {
    try {
      const { data } = await api.get(`/v1/documents/${payload.documentId}/users/${payload.userId}`)

      await thunkAPI.dispatch(patchDocumentState({ document: data }))
      return data
    } catch (ignore) {
      thunkAPI.dispatch(patchDocumentState({ document: undefined }))
    }
  },
)
