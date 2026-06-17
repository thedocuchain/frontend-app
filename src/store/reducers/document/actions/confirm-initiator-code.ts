import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from 'src/store/apis'

export const confirmInitiatorCode = createAsyncThunk(
  'document/confirm-initiator-code',
  async (payload: { documentId: string; code: string }): Promise<{ ok: boolean }> => {
    try {
      await api.post(`/v1/documents/${payload.documentId}/verify-initiator/confirm`, {
        code: payload.code,
      })

      return { ok: true }
    } catch (error) {
      return { ok: false }
    }
  },
)
