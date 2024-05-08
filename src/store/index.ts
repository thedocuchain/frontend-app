import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

import { createLocalStore } from './store'

export type AppState = ReturnType<ReturnType<typeof createLocalStore>['getState']>
export type AppStore = ReturnType<typeof createLocalStore>
export type TypedDispatch = AppStore['dispatch']
export type ApiDispatch = ThunkDispatch<AppState, undefined, AnyAction> & TypedDispatch
