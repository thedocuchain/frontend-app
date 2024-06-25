import { createAsyncThunk } from '@reduxjs/toolkit'

import { DocumentType } from 'src/store/reducers/document/types'
import { DefaultApiResponse } from 'src/store/reducers/types'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'

export const updateDocumentMiddleware = createAsyncThunk(
  'document/update-middleware',
  async (payload: { id: string }, thunkAPI): Promise<DocumentType | DefaultApiResponse> => {
    try {
      const id = useAppSelector(selectedDocument).id

      if (id === payload.id) {
        await thunkAPI.dispatch(
          getDocument({
            id: payload.id,
          }),
        )
      }
    } catch (ignore) {
      return null
    }
  },
)
