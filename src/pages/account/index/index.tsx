import React, { useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Text } from 'src/components/ui/typography'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { Loader } from 'src/components/ui/loader'
import { ToastContext } from 'src/components/common/toast/context'
import { IconFileGrey, IconFlag, IconPlusBlack } from 'src/icons'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccountDocuments } from 'src/store/reducers/account'
import { AccountDocumentItem } from 'src/store/reducers/account/types'
import {
  getAccountDocuments,
  getAccountSignLink,
  markAccountDocumentSeen,
  reportAccountDocument,
} from 'src/store/reducers/account/actions/documents'
import { uploadDocument } from 'src/store/reducers/document/actions/files'
import { requireAccountAuth } from 'src/utils/account-guard'

import { ReportModal } from './components/report-modal'
import styles from './styles.module.css'

const SIGNED_STATUSES = ['signed', 'completed', 'blockchained']

export function AccountDocumentsPage() {
  const { title } = usePageHead({ title: '| My documents' })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)
  const documents = useAppSelector(selectedAccountDocuments)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
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
    fileInputRef.current?.click()
  })

  const handleFileSelected = useEvent(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setIsUploading(true)
    const result = await dispatch(uploadDocument({ file }))
    setIsUploading(false)

    const redirectUrl = (result.payload as { redirectUrl?: string })?.redirectUrl
    if (redirectUrl) {
      window.open(redirectUrl, '_self')
      return
    }
    toast.addToast({ text: 'Could not upload the document. Please try again.' })
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

      <div className={styles.topRow}>
        <Button size='sm' onClick={handleCreateNew} isLoading={isUploading}>
          <ButtonIcon stroke>
            <IconPlusBlack />
          </ButtonIcon>
          Create new document
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='application/pdf'
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
                {!document.isInitiator && (
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
