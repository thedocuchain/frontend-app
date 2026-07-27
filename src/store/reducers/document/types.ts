export type Signature = {
  id?: string
  signed: boolean
  signFont?: string
  signImage?: string
  fontSize?: number
  signDate?: string // ISO dateTimeString with TZ
  yCoordinate?: number
  pageNumber?: number
}

export enum Chains {
  POLYGON = 'polygon',
  DIGIBYTE = 'digibyte',
  SOLANA = 'solana',
  MONAD = 'monad',
  BASE = 'base',
  BITCOIN = 'bitcoin',
  SEI = 'sei',
}

export type User = {
  id?: string
  name?: string
  email: string
  position?: number
  role: 'signer' | 'watcher'
  signatures?: Signature[]
  isInitiator?: boolean

  firstToHear?: boolean
  agreedWithPolicy?: boolean
  readRecordsDisclosure?: boolean

  lastNotifyDate?: string // ISO dateTimeString with TZ
  notifyStatus?: 'delivered' | 'not sent' | 'error'
}

export type UserInfo = {
  name?: string
  email: string
  role: 'signer' | 'watcher'
  isInitiator?: boolean
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
  imageLink: string
  shortId: string
  width?: number
  height?: number
  originalHash?: string
  initiatorVerifiedAt?: string // ISO dateTimeString with TZ
}

export type AiReviewStatus = 'pending' | 'streaming' | 'completed' | 'failed'

export type AiReview = {
  id: string
  documentId: string
  status: AiReviewStatus
  prompt: string
  content: string
  error: string | null
  createdAt: string
}
