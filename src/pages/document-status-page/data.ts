import { DocumentType, Recipient } from 'src/store/reducers/document/types'

export const data: Recipient[] = [
  {
    name: 'Zig Moore',
    email: 'zig.moore@example.com',
    role: 'signer',
    status: 'signed',
    lastRemind: '2024-03-20 13:45',
    dateSigned: '10.10.2024',
  },
  {
    name: 'Charlotte Moore',
    email: 'charlotte.moore@example.com',
    role: 'signer',
    status: 'signed',
    lastRemind: '2024-03-20 13:45',
    dateSigned: '10.10.2024',
  },
  {
    name: 'Alex Johnson',
    email: 'maria.smith@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Ava Martin',
    email: 'ava.martin@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Benjamin Carter',
    email: 'benjamin.carter@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    email: 'info11041967watcher@gmail.com',
    role: 'watcher',
  },
  {
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Abby Goldman',
    email: 'info11041967@gmail.com',
    role: 'watcher',
  },
  {
    name: 'Liam Taylor',
    email: 'liam.taylor@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Maria Smith',
    email: 'maria.smith@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Noah Miller',
    email: 'noah.miller@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Olivia Wilson',
    email: 'olivia.wilson@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Tim Cook',
    email: 'drandom.traveler42@example.com',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
  {
    name: 'Konstantin Konstantinopolsky',
    email: 'creative.mindset98@example.net',
    role: 'signer',
    status: 'awaiting',
    lastRemind: '2024-03-20 13:45',
  },
]

export const documentMock: DocumentType = {
  id: 'Y16334',
  signers: data,
  pages: 6,
  name: 'Contractor Agreement',
  status: 'signing',
}
