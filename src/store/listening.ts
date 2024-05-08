import type { AppState, TypedDispatch } from 'src/store/index'

import { createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<AppState, TypedDispatch>
export const startAppListening = listenerMiddleware.startListening as AppStartListening
