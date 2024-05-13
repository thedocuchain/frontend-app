import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Toast } from 'src/store/reducers/toasts/types'
import { AppState } from 'src/store'

const storeKey = '@redux/toasts'

export interface ToastsState {
  toasts: Toast[]
}

const initialState: ToastsState = {
  toasts: [],
}

export const whitelist = []

export const toastsSlice = createSlice({
  name: storeKey,
  initialState,
  reducers: {
    addItemToast: (state: ToastsState, action: PayloadAction<Toast>) => {
      if (!state.toasts) state.toasts = []
      state.toasts.push(action.payload)
    },
    hideItemToast: (state: ToastsState, action: PayloadAction<string>) => {
      if (!state.toasts) state.toasts = []
      const findItem = state.toasts.find((item) => item.uuid === action.payload)
      if (findItem) {
        findItem.isHidden = true
      }
    },
    removeItemToast: (state: ToastsState, action: PayloadAction<string>) => {
      if (!state.toasts) state.toasts = []
      const index = state.toasts.findIndex((item) => item.uuid === action.payload)
      if (index > -1) {
        state.toasts.splice(index, 1)
      }
    },
    removeAllToasts: (state: ToastsState) => {
      ;(state.toasts || []).forEach((item) => {
        item.isHidden = true
      })
    },
  },
})

export const { addItemToast, removeItemToast, removeAllToasts, hideItemToast } = toastsSlice.actions

export const selectedToasts = (state: AppState) => state[storeKey].toasts || []
