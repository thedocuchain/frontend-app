import { isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { startAppListening } from 'src/store/listening'
import { wsAction, WsTypeAction } from 'src/store/apis/ws'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

startAppListening({
  matcher: isAnyOf(wsAction),
  effect(action: PayloadAction<WsTypeAction>, api) {
    if (action.payload.method === 'onDocumentStatusUpdated') {
      api.dispatch(
        getDocument({
          id: action.payload.message.documentId,
        }),
      )
    }
  },
})
