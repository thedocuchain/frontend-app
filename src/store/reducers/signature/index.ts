import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from 'src/store'
import patchStateReducer from 'src/store/utils/patch-state'

const storeKey = '@redux/signature'

export interface SignatureState {
  signatureFont: string
  fontSize: number
  signDate: string
  isSigned: boolean
  isError: boolean
}

const initialState: SignatureState = {
  signatureFont: undefined,
  fontSize: undefined,
  signDate: undefined,
  isSigned: false,
  isError: false,
}

export const whitelist = []

export const signatureSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    patchSignatureState: (state, action: PayloadAction<Partial<SignatureState>>) => {
      patchStateReducer(state, action)
    },
    setSignatureFont: (state: SignatureState, action: PayloadAction<string>) => {
      state.signatureFont = action.payload
    },
    setFontSize: (state: SignatureState, action: PayloadAction<number>) => {
      state.fontSize = action.payload
    },
    setSignDate: (state: SignatureState, action: PayloadAction<string>) => {
      state.signDate = action.payload
    },
    setSigned: (state: SignatureState, action: PayloadAction<boolean>) => {
      state.isSigned = action.payload
      state.isError = false
    },
    setSignatureError: (state: SignatureState, action: PayloadAction<boolean>) => {
      state.isError = action.payload
    },
  },
})

export const { setSignatureFont, setFontSize, setSignDate, setSigned, setSignatureError } = signatureSlice.actions

export const selectSettingState = (state: AppState) => state[storeKey] as SignatureState
export const selectedSignatureFont = (state: AppState): string => state[storeKey].signatureFont
export const selectedFontSize = (state: AppState): number => state[storeKey].fontSize
export const selectedSignDate = (state: AppState): string => state[storeKey].signDate
export const selectedIsSigned = (state: AppState): boolean => state[storeKey].isSigned
export const selectedIsSignError = (state: AppState): boolean => state[storeKey].isError
