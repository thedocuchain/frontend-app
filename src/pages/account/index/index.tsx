import React, { useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Loader } from 'src/components/ui/loader'
import { ToastContext } from 'src/components/common/toast/context'
import { IconFileGrey, IconFlag, IconUploadBox } from 'src/icons'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccountDocuments } from 'src/store/reducers/account'
import { AccountDocumentItem } from 'src/store/reducers/account/types'
import {
  getAccountDocuments,
  getAccountSignLink,
  markAccountDocumentSeen,
  reportAccountDocument,
  uploadAccountDocument,
} from 'src/store/reducers/account/actions/documents'
import { ApiErrorPayload } from 'src/store/reducers/account/actions/api-error'
import { requireAccountAuth } from 'src/utils/account-guard'

import { ReportModal } from './components/report-modal'
import styles from './styles.module.css'

const SIGNED_STATUSES = ['signed', 'completed', 'blockchained']

const UPLOAD_ACCEPT =
  '.pdf,.doc,.docx,.xlsx,.odt,.jpg,.jpeg,.png,application/pdf,application/msword,' +
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
  'application/vnd.oasis.opendocument.text,image/jpeg,image/png'

export function AccountDocumentsPage() {
  const { title } = usePageHead({ title: '| My documents' })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)
  const documents = useAppSelector(selectedAccountDocuments)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [reportTarget, setReportTarget] = useState<AccountDocumentItem | null>(null)
  const [isReporting, setIsReporting] = useState(false)

  const handleOpen = useEvent(async (document: AccountDocumentItem) => {
    void dispatch(markAccountDocumentSeen({ id: document.id }))

    if (document.needsMySign) {
      const result = await dispatch(getAccountSignLink({ id: document.id }))
      if (getAccountSignLink.fulfilled.match(result)) {
        const { userId, token, expiredAt } = result.payload
        void router.push(`/doc/sign/${document.id}?userId=${userId}&token=${token}&expiredAt=${expiredAt}`)
        return
      }
      toast.addToast({ text: 'Could not open the document. Please try again.' })
      return
    }

    void router.push(`/doc/status/${document.id}`)
  })

  const handleCreateNew = useEvent(() => {
    if (isUploading) return
    fileInputRef.current?.click()
  })

  const uploadFile = useEvent(async (file: File) => {
    setIsUploading(true)
    const result = await dispatch(uploadAccountDocument({ file }))
    setIsUploading(false)

    if (uploadAccountDocument.fulfilled.match(result)) {
      const redirectUrl = result.payload?.redirectUrl
      if (redirectUrl) {
        window.open(redirectUrl, '_self')
        return
      }
      toast.addToast({ text: 'Could not upload the document. Please try again.' })
      return
    }

    const error = result.payload as ApiErrorPayload | undefined
    if (error?.code === 'PLAN_LIMIT_DOCS') {
      toast.addToast({ text: error.message })
      void router.push('/account/billing')
      return
    }
    toast.addToast({ text: error?.message ?? 'Could not upload the document. Please try again.' })
  })

  const handleFileSelected = useEvent((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) void uploadFile(file)
  })

  const handleDragOver = useEvent((event: React.DragEvent) => {
    event.preventDefault()
    if (!isUploading) setIsDragging(true)
  })

  const handleDragLeave = useEvent((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  })

  const handleDrop = useEvent((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    if (isUploading) return
    const file = event.dataTransfer.files?.[0]
    if (file) void uploadFile(file)
  })

  const handleReport = useEvent(async () => {
    if (!reportTarget) return

    setIsReporting(true)
    const result = await dispatch(reportAccountDocument({ id: reportTarget.id }))
    setIsReporting(false)
    setReportTarget(null)

    if (reportAccountDocument.fulfilled.match(result)) {
      toast.addToast({ text: 'Thanks — this sender has been reported.' })
      void dispatch(getAccountDocuments())
      return
    }
    toast.addToast({ text: (result.payload as { message?: string })?.message ?? 'Could not report the document.' })
  })

  const handleCheckFromModal = useEvent(() => {
    const target = reportTarget
    setReportTarget(null)
    if (target) void handleOpen(target)
  })

  return (
    <>
      <PageHead>{title}</PageHead>

      <div
        className={cn(styles.dropzone, { [styles.dragging]: isDragging })}
        onClick={handleCreateNew}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className={styles.uploadIcon}>
          <IconUploadBox />
        </span>
        <Text theme='headline-4' header='h2' className={styles.dropTitle}>
          Drag and drop or click to upload
        </Text>
        <Text theme='body-2' className={cn('color-text-secondary', styles.dropHint)}>
          PDF, Word, Excel, ODT or images, up to 50MB
        </Text>
        <Button
          onClick={(event) => {
            event.stopPropagation()
            handleCreateNew()
          }}
          isLoading={isUploading}
          className={styles.uploadButton}
        >
          Upload document
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept={UPLOAD_ACCEPT}
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>

      {!documents && (
        <div className={styles.emptyState}>
          <Loader size={32} color='black' />
        </div>
      )}

      {documents?.length === 0 && (
        <div className={styles.emptyState}>
          <Text theme='body-1' className='color-text-secondary'>
            No documents yet. Create your first document to get started.
          </Text>
        </div>
      )}

      <div className={styles.list}>
        {documents?.map((document) => {
          const isSigned = document.signedByMe || SIGNED_STATUSES.includes(document.status)

          return (
            <div key={document.id} className={styles.card}>
              <div className={styles.fileIcon}>
                <IconFileGrey />
              </div>

              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <Text theme='label-1' className={styles.name}>
                    {document.name}
                  </Text>
                  {document.isNew && (
                    <span className={styles.newBadge}>
                      <Text theme='label-3'>New</Text>
                    </span>
                  )}
                </div>
                <div className={styles.statusRow}>
                  <Text theme='body-3' className='color-text-secondary'>
                    Status:
                  </Text>
                  <Text theme='label-3' className={isSigned ? styles.statusSigned : styles.statusAwaiting}>
                    {isSigned ? 'Signed' : 'Awaiting'}
                  </Text>
                </div>
              </div>

              <div className={styles.actions}>
                <Button theme='secondary' size='sm' onClick={() => void handleOpen(document)}>
                  {document.needsMySign ? 'Check' : 'View'}
                </Button>
                {!document.isInitiator && !isSigned && (
                  <button
                    className={cn(styles.flagButton, 'on-click')}
                    onClick={() => setReportTarget(document)}
                    aria-label='Report document'
                  >
                    <IconFlag className={styles.flagIcon} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <ReportModal
        visible={!!reportTarget}
        isLoading={isReporting}
        onClose={() => setReportTarget(null)}
        onCheck={handleCheckFromModal}
        onReport={handleReport}
      />
    </>
  )
}

AccountDocumentsPage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuth(context, store)
  return {}
}


AccountDocumentsPage.getLayout = AccountLayout
