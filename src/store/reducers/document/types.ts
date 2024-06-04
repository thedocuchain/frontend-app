export type Signature = {
  id?: string
  signed: boolean
  signFont?: string
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
  agreedWithPolicy?: boolean
  // todo передавать при проставлении подписи
  readRecordsDislosure?: boolean
  firstToHear?: boolean
  role: 'signer' | 'watcher'
  signatures?: Signature[]
}

export type UserInfo = {
  name?: string
  email: string
  role: 'signer' | 'watcher'
  // todo прокинуть в addUsersToDocument
  // agreedWithPolicy: boolean
  // firstToHear: boolean
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
  file: string // todo document download link
  linkExpiredAt?: string // ISO dateTimeString with TZ
  users: User[]

  // todo add on backend
  shortId: string
  pages: number
  xOffset: number
}
