import { DocumentType, User } from 'src/store/reducers/document/types'

export const signersData: User[] = [
  {
    email: 'info11041967watcher@gmail.com',
    role: 'watcher',
  },
  {
    name: 'Abby Goldman',
    email: 'info11041967@gmail.com',
    role: 'watcher',
  },
  {
    name: 'Zig Moore',
    email: 'zig.moore@example.com',
    role: 'signer',

    signature: {
      signed: true,
      notified: true,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
      signDate: '2024-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Charlotte Moore',
    email: 'charlotte.moore@example.com',
    role: 'signer',

    signature: {
      signed: true,
      notified: true,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
      signDate: '2024-05-08T23:41:54.000Z',
    },
  },
  {
    name: 'Benjamin Carter',
    email: 'benjamin.carter@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Alex Johnson',
    email: 'maria.smith@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Ava Martin',
    email: 'ava.martin@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Liam Taylor',
    email: 'liam.taylor@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Maria Smith',
    email: 'maria.smith@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Noah Miller',
    email: 'noah.miller@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Olivia Wilson',
    email: 'olivia.wilson@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Tim Cook',
    email: 'drandom.traveler42@example.com',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
  {
    name: 'Konstantin Konstantinopolsky',
    email: 'creative.mindset98@example.net',
    role: 'signer',

    signature: {
      signed: false,
      notified: false,
      lastNotifyDate: '2024-05-27T15:00:00.000000+03:00',
    },
  },
]

export const documentMock: DocumentType = {
  id: 'e03cdd0a-7cf6-4f29-8f54-7979dddff081',
  // id: 'Y16334',
  users: signersData,
  pages: 4,
  type: 'application/pdf',
  signedBy: 3,
  hash: '91f775524508900f300ffff6872bb5f806398440',
  blockchainTransaction: '91f775524508900f300ffff6872bb5f806398440',
  fileStorageId: 'fc027ff1-5e94-4933-9875-78d1b8a9676f',
  name: 'Contractor Agreement',
  // status: 'uploaded',
  status: 'signing',
  xOffset: 480,
  file: 'https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/pdfreference1.0.pdf',
  // file: 'https://pdfobject.com/pdf/pdf_open_parameters_acro8.pdf',
  // file: 'https://storage.googleapis.com/example_bucket_202412/ad28537c-19ac-46b2-85c0-5a0085c0512c?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=testcloudstorage-465%40flash-crawler-424011-m1.iam.gserviceaccount.com%2F20240527%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240527T134801Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=REDACTED',
}
