import { createAction } from '@reduxjs/toolkit'

export const BASE_WS = 'https://api.docuchain.io/'

export enum Channels {
  onDocumentStatusUpdated = 'onDocumentStatusUpdated',
}

export type WsTypeActionDocumentStatusUpdated = {
  method: Channels.onDocumentStatusUpdated
  message: { documentId: string }
}

export type WsTypeAction = WsTypeActionDocumentStatusUpdated

export const wsAction = createAction<WsTypeAction>('ws/action')
