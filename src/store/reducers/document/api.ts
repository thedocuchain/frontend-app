import { createAsyncThunk } from '@reduxjs/toolkit'

import { DocumentType } from 'src/store/reducers/document/types'
import { DefaultApiResponse } from 'src/store/reducers/types'
import { api } from 'src/store/apis'
import { patchDocumentState } from 'src/store/reducers/document/index'

export const fetchDocument = createAsyncThunk(
  'document/get',
  async (_, thunkAPI): Promise<DocumentType | DefaultApiResponse> => {
    const { data } = await api.get('/v1/document')

    await thunkAPI.dispatch(patchDocumentState({ document: data }))
    return data
  },
)
