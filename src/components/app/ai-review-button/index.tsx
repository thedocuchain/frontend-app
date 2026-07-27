import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Button } from 'src/components/ui/button'
import { ToastContext } from 'src/components/common/toast/context'
import { IconSparkle } from 'src/icons'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccountToken } from 'src/store/reducers/auth'
import { startAiReview } from 'src/store/reducers/document/actions/ai-review'

import styles from './styles.module.css'

export function AiReviewButton({ documentId }: { documentId: string }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)
  const accountToken = useAppSelector(selectedAccountToken)
  const [isLoading, setLoading] = useState(false)

  const handleClick = useEvent(async () => {
    setLoading(true)
    const result = await dispatch(startAiReview({ documentId }))
    setLoading(false)

    if (startAiReview.rejected.match(result)) {
      toast.addToast({
        text: result.payload?.message || 'Something went wrong. Please try again.',
        timeout: 5000,
      })
      return
    }

    void router.push(`/doc/${documentId}/ai-review?from=${encodeURIComponent(router.asPath)}`)
  })

  if (!accountToken) {
    return null
  }

  return (
    <Button size='sm' className={styles.button} isLoading={isLoading} onClick={handleClick}>
      <IconSparkle className={styles.icon} />
      Review with AI
    </Button>
  )
}
