import { createAsyncThunk } from '@reduxjs/toolkit'

import { DocumentType } from 'src/store/reducers/document/types'
import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { patchDocumentState } from 'src/store/reducers/document'

export const getDocument = createAsyncThunk(
  'document/get',
  async (payload: { id: string }, thunkAPI): Promise<DocumentType | DefaultApiResponse> => {
    try {
      const { data } = await api.get(`/v1/documents/${payload.id}`)

      await thunkAPI.dispatch(patchDocumentState({ document: data }))
      return data
    } catch (ignore) {
      thunkAPI.dispatch(patchDocumentState({ document: undefined }))
    }
  },
)
