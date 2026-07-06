import type { AppState } from 'src/store'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { actionUserLogout } from 'src/store/reducers/auth/api'
import { AccountDocumentItem, AccountInfo } from 'src/store/reducers/account/types'

export const storeKey = '@redux/account'

export interface AccountState {
  account: AccountInfo | null
  documents: AccountDocumentItem[] | null
}

const initialState: AccountState = {
  account: null,
  documents: null,
}

export const whitelist = []

export const accountSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    patchAccountState: (state: AccountState, action: PayloadAction<Partial<AccountState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(actionUserLogout, () => initialState)
  },
})

export const { patchAccountState } = accountSlice.actions

export const selectedAccount = (state: AppState) => state[storeKey].account
export const selectedAccountDocuments = (state: AppState) => state[storeKey].documents
export const selectedNewDocumentsCount = (state: AppState) =>
  state[storeKey].documents?.filter((document) => document.isNew).length ?? 0
