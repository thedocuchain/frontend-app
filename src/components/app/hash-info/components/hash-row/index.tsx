import React, { useContext, useEffect } from 'react'

import { Text } from 'src/components/ui/typography'
import { Row } from 'src/components/ui/grid'
import { useClipboard } from 'src/utils/use/use-clipboard'
import { CopyIcon } from 'components/app/hash-info/components/hash-row/copy-icon'
import { ToastContext } from 'src/components/common/toast/context'
import { Space } from 'src/components/ui/space'

import styles from './styles.module.css'

export function HashRow({ title, data }: { title: string; data: string }) {
  const [handleCopy, isCopied] = useClipboard()
  const toast = useContext(ToastContext)

  useEffect(() => {
    if (isCopied) {
      toast.addToast({
        text: 'Copied!',
      })
    }
  }, [isCopied])

  if (!data) return null

  return (
    <Row className={styles.textBlock}>
      <Text theme={'label-2'} className='color-text-secondary white-space-nowrap'>
        {title}
      </Text>

      <Text theme={'body-3'} className='color-text-secondary'>
        {data}
      </Text>

      <Space horizontal size={6} />
      <div onClick={handleCopy(data)}>
        <CopyIcon />
      </div>
    </Row>
  )
}
