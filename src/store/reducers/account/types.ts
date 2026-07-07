export interface AccountInfo {
  id: string
  email: string
  name: string
  avatarImage: string | null
  signFont: string | null
  signImage: string | null
  createdAt: string
}

export interface AccountDocumentItem {
  id: string
  name: string
  status: string
  createdAt: string
  isInitiator: boolean
  signedByMe: boolean
  needsMySign: boolean
  isNew: boolean
}

export interface AccountSessionItem {
  id: string
  userAgent: string | null
  ip: string | null
  country: string | null
  createdAt: string
  lastActiveAt: string
  isCurrent: boolean
}
