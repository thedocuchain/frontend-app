import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { DocumentLayout } from 'src/components/app/document-layout'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { Avatar } from 'src/components/app/avatar'
import { Button } from 'src/components/ui/button'
import { Text } from 'src/components/ui/typography'
import { Loader } from 'src/components/ui/loader'
import { IconArrowBack, IconFileGrey } from 'src/icons'
import { AppStore } from 'src/store'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { selectedAccount } from 'src/store/reducers/account'
import { selectedAccountToken } from 'src/store/reducers/auth'
import { AiReview } from 'src/store/reducers/document/types'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { getAiReview, startAiReview } from 'src/store/reducers/document/actions/ai-review'
import { requireAccountAuthReturn } from 'src/utils/account-guard'
import { AI_REVIEW_PROMPT } from 'src/configs/ai-review'

import { ReviewMarkdown } from './components/review-markdown'
import { useTypewriter } from './use-typewriter'
import AiAvatar from './images/ai-avatar.png'
import styles from './styles.module.css'

const POLL_INTERVAL_MS = 900

export type StepsAiReviewPage = 'review' | 'document-error'

export function AiReviewPage({ step }: { step: StepsAiReviewPage }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const document = useAppSelector(selectedDocument)
  const account = useAppSelector(selectedAccount)
  const inDashboard = !!useAppSelector(selectedAccountToken)
  const { title } = usePageHead({ title: ` | ${document?.name || 'Document not found'}` })

  const documentId = router.query.id as string
  const [review, setReview] = useState<AiReview | null>(null)
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const isRequesting = useRef(false)

  const reviewId = review?.id ?? null
  const isGenerating = !review || review.status === 'pending' || review.status === 'streaming'

  const { visibleText, isTyping } = useTypewriter(reviewId, review?.content ?? '', !!review)

  useEffect(() => {
    if (step !== 'review' || !documentId) return

    let isActive = true

    // Creates the review when the page is opened directly rather than via the button.
    const load = async (canCreate: boolean) => {
      if (isRequesting.current) return
      isRequesting.current = true

      const result = await dispatch(getAiReview({ documentId }))
      isRequesting.current = false
      if (!isActive) return

      if (getAiReview.rejected.match(result)) {
        if (result.payload?.code === 'PLAN_LIMIT_AI_REVIEW') {
          setUpgradeMessage(result.payload.message)
          return
        }
        setLoadError(result.payload?.message ?? 'Something went wrong. Please try again.')
        return
      }

      if (result.payload) {
        setReview(result.payload)
        return
      }

      if (!canCreate) return

      const created = await dispatch(startAiReview({ documentId }))
      if (!isActive) return

      if (startAiReview.rejected.match(created)) {
        if (created.payload?.code === 'PLAN_LIMIT_AI_REVIEW') {
          setUpgradeMessage(created.payload.message)
          return
        }
        setLoadError(created.payload?.message ?? 'Something went wrong. Please try again.')
        return
      }

      setReview(created.payload)
    }

    void load(true)

    return () => {
      isActive = false
    }
  }, [step, documentId, dispatch])

  // Generation continues server-side; just pull the accumulated text until done.
  useEffect(() => {
    if (step !== 'review' || !documentId || !reviewId || !isGenerating) return

    let isActive = true

    const timer = setInterval(async () => {
      if (isRequesting.current) return
      isRequesting.current = true

      const result = await dispatch(getAiReview({ documentId }))
      isRequesting.current = false

      if (isActive && getAiReview.fulfilled.match(result) && result.payload) {
        setReview(result.payload)
      }
    }, POLL_INTERVAL_MS)

    return () => {
      isActive = false
      clearInterval(timer)
    }
  }, [step, documentId, reviewId, isGenerating, dispatch])

  // Reachable from the initiation, signing and view screens.
  const handleBack = useEvent(() => {
    const from = router.query.from as string | undefined
    void router.push(from?.startsWith('/') ? from : `/doc/view/${documentId}`)
  })

  if (step === 'document-error') {
    return (
      <>
        <PageHead>{title}</PageHead>
        <PageWrapper className={'column'}>
          {!inDashboard && <Header isTransparent />}
          <StatusScreenTemplate is404Document />
        </PageWrapper>
      </>
    )
  }

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper className={'column'}>
        {!inDashboard && <Header isDocumentPreview title={document?.name} />}

        <div className={cn(styles.wrapper, { [styles.inDashboard]: inDashboard })}>
          <div className={styles.content}>
            <button className={styles.back} onClick={handleBack}>
              <IconArrowBack className={styles.backIcon} />
              <Text theme='button-standard'>Back</Text>
            </button>

            <div className={styles.request}>
              <div className={styles.bubble}>
                <div className={styles.fileChip}>
                  <IconFileGrey className={styles.fileIcon} />
                  <Text theme='label-3' className={styles.fileName}>
                    {document?.name}
                  </Text>
                </div>
                <Text theme='body-3'>{review?.prompt || AI_REVIEW_PROMPT}</Text>
              </div>
              <Avatar name={account?.name ?? ''} image={account?.avatarImage} index={0} size={40} />
            </div>

            {upgradeMessage && (
              <div className={styles.notice}>
                <Text theme='body-2'>{upgradeMessage}</Text>
                <Button size='sm' onClick={() => void router.push('/account/billing')}>
                  Upgrade plan
                </Button>
              </div>
            )}

            {loadError && (
              <div className={styles.notice}>
                <Text theme='body-2'>{loadError}</Text>
              </div>
            )}

            {review && (
              <div className={styles.answer}>
                <img src={AiAvatar.src} alt='' className={styles.aiAvatar} />

                <div className={styles.answerBody}>
                  {!visibleText && isGenerating && (
                    <div className={styles.thinking}>
                      <Loader size={20} color='black' />
                      <Text theme='body-3' className='color-text-secondary'>
                        Reading the document…
                      </Text>
                    </div>
                  )}

                  {visibleText && <ReviewMarkdown content={visibleText} />}

                  {review.status === 'failed' && !isTyping && (
                    <Text theme='body-2' className='color-text-error'>
                      {review.error || 'The review could not be completed. Please try again later.'}
                    </Text>
                  )}

                  {!!visibleText && !isTyping && !isGenerating && (
                    <Text theme='body-3' className={styles.disclaimer}>
                      ! AI may make mistakes. Verify important info.
                    </Text>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

AiReviewPage.getLayout = DocumentLayout

AiReviewPage.getInitialProps = async (context, store: AppStore) => {
  const dispatch = store.dispatch
  const documentId = context.query.id as string

  const isMatchId = documentId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  if (!isMatchId) {
    return { step: 'document-error' }
  }

  if (!requireAccountAuthReturn(context, store, `/doc/${documentId}/ai-review`)) {
    return { step: 'document-error' }
  }

  const document = await dispatch(getDocument({ id: documentId })).unwrap()

  if (!document) {
    return { step: 'document-error' }
  }

  return { step: 'review' }
}
