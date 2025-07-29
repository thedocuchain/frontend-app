// from https://redux.js.org/usage/writing-logic-thunks
// standard middleware definition, with 3 nested functions:
// 1) Accepts `{dispatch, getState}`
// 2) Accepts `next`
// 3) Accepts `action`.
import { AnyAction, Dispatch } from '@reduxjs/toolkit'

import { AppState } from '../index'

export const thunkMiddleware =
  ({ dispatch, getState }: { dispatch: Dispatch; getState: () => AppState }) =>
  (next: (action: AnyAction) => void) =>
  (action: ((dispatch: Dispatch, state: AppState) => void) | AnyAction) => {
    if (typeof action === 'function') {
      return action(dispatch, getState())
    }

    return next(action)
  }

export const createTokenThunk = (storeKey: string, additionalKey: string): string => `${storeKey}${additionalKey}`
