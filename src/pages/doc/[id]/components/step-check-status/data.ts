import { DocumentType, User } from 'src/store/reducers/document/types'

export const signersData: User[] = [
  {
    email: 'info11041967watcher@gmail.com',
    role: {
      name: 'watcher',
    },
  },
  {
    name: 'Abby Goldman',
    email: 'info11041967@gmail.com',
    role: {
      name: 'watcher',
    },
  },
  {
    name: 'Zig Moore',
    email: 'zig.moore@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: true,
      notified: true,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
      signDate: '2024-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Charlotte Moore',
    email: 'charlotte.moore@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: true,
      notified: true,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
      signDate: '2024-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Benjamin Carter',
    email: 'benjamin.carter@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Alex Johnson',
    email: 'maria.smith@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Ava Martin',
    email: 'ava.martin@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Liam Taylor',
    email: 'liam.taylor@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Maria Smith',
    email: 'maria.smith@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Noah Miller',
    email: 'noah.miller@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Olivia Wilson',
    email: 'olivia.wilson@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Tim Cook',
    email: 'drandom.traveler42@example.com',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Konstantin Konstantinopolsky',
    email: 'creative.mindset98@example.net',
    role: {
      name: 'signer',
    },
    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2010-05-08T23:41:54.000Z',
    },
  },
]

export const documentMock: DocumentType = {
  id: 'Y16334',
  users: signersData,
  pages: 4,
  name: 'Contractor Agreement',
  status: 'signing',
  xOffset: 480,
  // file: 'https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/pdfreference1.0.pdf',
  file: 'https://pdfobject.com/pdf/pdf_open_parameters_acro8.pdf',
}
