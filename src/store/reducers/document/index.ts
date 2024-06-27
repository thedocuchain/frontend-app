import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { objectKeys } from '@coxy/utils'

import patchStateReducer from 'src/store/utils/patch-state'
import { DocumentType } from 'src/store/reducers/document/types'

export const storeKey = '@redux/document'

export interface DocumentState {
  document: undefined | DocumentType
  imageLinkMemo: string
}

const initialState: DocumentState = {
  document: undefined,
  imageLinkMemo: undefined,
}

export const whitelist = objectKeys(initialState)

export const documentSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    patchDocumentState: (state, action: PayloadAction<Partial<DocumentState>>) => {
      patchStateReducer(state, action)
    },
  },
})

export const { patchDocumentState } = documentSlice.actions
