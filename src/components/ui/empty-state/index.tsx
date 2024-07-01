import React from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Column } from 'src/components/ui/grid'
import { Space } from 'src/components/ui/space'
import { IconEmptyContentError, IconEmptyContentSuccess } from 'src/icons'

import styles from './styles.module.css'

type EmptyStateProps = {
  type: 'error' | 'default' | 'success-send-feedback'
  className?: string
  onClick?: () => void
}

export function EmptyState(props: EmptyStateProps) {
  const { type, className, onClick } = props

  const cl = cn(styles.wrapper, className)

  const handleClick = useEvent(() => {
    if (onClick) {
      onClick()
    }
  })

  return (
    <div className={cl}>
      {type === 'error' && (
        <Column className='w100-p column-center'>
          <IconEmptyContentError />
          <Space size={20} />

          <Text theme={'headline-2'}>Document loading issue</Text>
          <Space size={4} />
          <Text theme={'body-3'} className='color-text-secondary text-center'>
            Please refresh the page or wait a few minutes. Contact support if the issue persists.
          </Text>

          <Space size={16} />
          <Button theme={'link-primary'} href={'mailto:support@docuchain.io'}>
            Contact support
          </Button>
        </Column>
      )}
      {type === 'success-send-feedback' && (
        <Column className='w100-p column-center'>
          <IconEmptyContentSuccess />
          <Space size={20} />

          <Text theme={'headline-2'}>We have received your message</Text>
          <Space size={4} />
          <Text theme={'body-3'} className='color-text-secondary text-center'>
            Thanks for taking the time to send us feedback. To continue working on your last document, press the link
            below.
          </Text>

          <Space size={16} />
          <Button theme={'link-primary'} onClick={handleClick}>
            Back to the document
          </Button>
        </Column>
      )}
    </div>
  )
}
