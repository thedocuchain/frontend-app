export type AccountPlan = 'free' | 'pro' | 'pro_max'

export interface AccountInfo {
  id: string
  email: string
  name: string
  avatarImage: string | null
  signFont: string | null
  signImage: string | null
  plan: AccountPlan
  createdAt: string
}

export type BillingInterval = 'month' | 'year'

export interface BillingStatus {
  billingEnabled: boolean
  plan: AccountPlan
  interval: BillingInterval
  subscriptionStatus: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
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
