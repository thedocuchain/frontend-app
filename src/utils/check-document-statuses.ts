import { DocumentStatuses } from 'src/store/reducers/document/types'

export function isNeedToUpdateDocument(status: DocumentStatuses): boolean {
  if (
    status === DocumentStatuses.UPLOADED ||
    status === DocumentStatuses.RECIPIENT_ADDED ||
    status === DocumentStatuses.SENT ||
    status === DocumentStatuses.DELIVERED ||
    status === DocumentStatuses.PARTIALLY_SIGNED ||
    status === DocumentStatuses.SIGNED ||
    status === DocumentStatuses.COMPLETED
  ) {
    return true
  }
  return false
}
