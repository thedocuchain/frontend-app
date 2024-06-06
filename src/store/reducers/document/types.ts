export type Signature = {
  id?: string
  signed: boolean
  signFont?: string
  fontSize?: number
  signDate?: string // ISO dateTimeString with TZ
  notified: boolean
  lastNotifyDate?: string // ISO dateTimeString with TZ
  yCoordinate?: number
  pageNumber?: number
}

export type User = {
  id?: string
  name?: string
  email: string
  position?: number
  role: 'signer' | 'watcher'
  signatures?: Signature[]

  // todo где передаем?
  agreedWithPolicy?: boolean
  readRecordsDislosure?: boolean
  firstToHear?: boolean
}

export type UserInfo = {
  name?: string
  email: string
  role: 'signer' | 'watcher'
}

export enum DocumentStatuses {
  DRAFT = 'draft',
  UPLOADED = 'uploaded',
  RECIPIENT_ADDED = 'recipient added',
  SENT = 'sent',
  DELIVERED = 'delivered',
  PARTIALLY_SIGNED = 'partially signed',
  SIGNED = 'signed',
  COMPLETED = 'completed',
  BLOCKCHAINED = 'blockchained',
}

export type DocumentType = {
  id: string
  name: string
  type: string
  hash: string
  blockchainTransaction: string
  fileStorageId: string
  signedBy: number
  status: DocumentStatuses
  linkExpiredAt?: string // ISO dateTimeString with TZ
  users: User[]
  downloadLink: string
  pagesCount: number

  // todo add on backend
  shortId: string
  previewImage?: string
}
