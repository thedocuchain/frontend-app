import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'

export const sendInitiatorCode = createAsyncThunk(
  'document/send-initiator-code',
  async (payload: { documentId: string }): Promise<{ ok: boolean; tooMany: boolean }> => {
    try {
      await api.post(`/v1/documents/${payload.documentId}/verify-initiator/send`)

      return { ok: true, tooMany: false }
    } catch (error) {
      return { ok: false, tooMany: error?.response?.status === 429 }
    }
  },
)
