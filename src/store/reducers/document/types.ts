export type Signature = {
  id?: string
  signed: boolean
  signDate?: string // ISO dateTimeString with TZ
  notified: boolean
  lastNotifyDate?: string // ISO dateTimeString with TZ
}

export type User = {
  id?: string
  name?: string
  email: string
  readDocument?: boolean
  agreedWithPolicy?: boolean
  readRecordsDislosure?: boolean
  role: 'signer' | 'watcher'
  signature?: Signature
}

export type UserInfo = {
  name?: string
  email: string
  role: 'signer' | 'watcher'
}

export type StatusDocumentType = 'draft' | 'uploaded' | 'signing' | 'completed' // todo add statuses

export type DocumentType = {
  id: string
  name: string
  type: string
  hash: string
  blockchainTransaction: string
  fileStorageId: string
  signedBy: number
  status: StatusDocumentType
  file: string // document download link
  linkExpiredAt?: string // ISO dateTimeString with TZ
  users: User[]

  // todo add on backend
  shortId: string
  pages: number
  xOffset: number
}
