import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { objectKeys } from '@coxy/utils'

import { AppState } from 'src/store'
import patchStateReducer from 'src/store/utils/patch-state'

const storeKey = '@redux/signature'

export interface SignatureState {
  signature: string
  font: number
}

const initialState: SignatureState = {
  signature: undefined,
  font: undefined,
}

export const whitelist = objectKeys(initialState)

export const signatureSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    patchSignatureState: (state, action: PayloadAction<Partial<SignatureState>>) => {
      patchStateReducer(state, action)
    },
    setSignature: (state: SignatureState, action: PayloadAction<string>) => {
      state.signature = action.payload
    },
    setFont: (state: SignatureState, action: PayloadAction<number>) => {
      state.font = action.payload
    },
  },
})

export const { setSignature, setFont } = signatureSlice.actions

export const selectSettingState = (state: AppState) => state[storeKey] as SignatureState
export const selectedSignature = (state: AppState): string => state[storeKey].signature
export const selectedFont = (state: AppState): number => state[storeKey].font
