export interface ApiErrorPayload {
  message: string
  statusCode: number
  code?: string
}

export function toApiErrorPayload(error): ApiErrorPayload {
  const message = error?.response?.data?.message

  return {
    message: (Array.isArray(message) ? message[0] : message) || 'Something went wrong. Please try again.',
    statusCode: error?.response?.status ?? 0,
    code: error?.response?.data?.code,
  }
}
