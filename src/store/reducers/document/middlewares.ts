import { isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { startAppListening } from 'src/store/listening'
import { wsAction, WsTypeAction } from 'src/store/apis/ws'
import { updateDocumentMiddleware } from 'src/store/reducers/document/actions/update-document-middleware'

startAppListening({
  matcher: isAnyOf(wsAction),
  effect(action: PayloadAction<WsTypeAction>, api) {
    if (action.payload.method === 'onDocumentStatusUpdated') {
      api.dispatch(
        updateDocumentMiddleware({
          id: action.payload.message.documentId,
        }),
      )
    }
  },
})
