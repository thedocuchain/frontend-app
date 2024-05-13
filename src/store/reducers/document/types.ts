export type DocumentType = {
  id: string
}

export type Recipient = {
  name: string
  email: string
  role: 'signer' | 'watcher'
  status?: 'awaiting' | 'signed'
  lastRemind?: string
}
