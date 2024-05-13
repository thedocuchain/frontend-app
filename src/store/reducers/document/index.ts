import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { objectKeys } from '@coxy/utils'

import { AppState } from 'src/store'
import patchStateReducer from 'src/store/utils/patch-state'
import { DocumentType } from 'src/store/reducers/document/types'

const storeKey = '@redux/document'

export interface DocumentState {
  document: undefined | DocumentType
}

const initialState: DocumentState = {
  document: undefined,
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

export const selectDocumentStateState = (state: AppState) => state[storeKey] as DocumentState
