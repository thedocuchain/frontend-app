export type Recipient = {
  name?: string
  email: string
  role: 'signer' | 'watcher'
  status?: 'awaiting' | 'signed'
  lastRemind?: string
}

export type DocumentType = {
  id: string
  signers: Recipient[]
  pages: number
  name: string
  status?: 'uploaded' | 'signing' | 'completed'
}
