import { createSelector } from '@reduxjs/toolkit'

import { AppState } from 'src/store'

import { DocumentState, storeKey } from './index'

export const selectDocumentState = (state: AppState) => state[storeKey] as DocumentState
export const selectedDocument = createSelector(selectDocumentState, (state) => state.document)
export const selectedImageLinkMemo = createSelector(selectDocumentState, (state) => state.imageLinkMemo)
