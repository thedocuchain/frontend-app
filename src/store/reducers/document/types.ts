export type Role = {
  id?: string
  name: 'signer' | 'watcher'
  description?: string
}

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
  firstToHear?: boolean
  role: Role
  signature?: Signature
}

export type DocumentType = {
  id: string
  name: string
  signedBy?: number
  status: 'uploaded' | 'signing' | 'completed' // todo add statuses
  file: string // document download link
  linkExpiredAt?: string // ISO dateTimeString with TZ
  hash?: string

  // todo add on backend
  users: User[]
  roles?: Role[]
  pages: number
  xOffset: number
}
