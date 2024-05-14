import React, { FocusEvent, MouseEvent, useRef, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { BottomSheet } from 'src/components/ui/dropdown/components/bottomsheet-mobile'
import { DotsButton } from 'src/components/ui/dots-button'
import { Text } from 'src/components/ui/typography'
import { Column } from 'src/components/ui/grid'

import styles from './styles.module.css'

export function DotsTable(props: { title: string; lastRemind: string }) {
  const { title, lastRemind } = props
  const isMobile = useIsMobile()
  const [isVisible, setVisible] = useState(false)
  const refTimer = useRef<TimeoutId>()

  const handleClose = useEvent(() => {
    setVisible(false)
  })

  const handleRemind = useEvent((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    handleClose()
  })

  const handleOpen = useEvent((event?: MouseEvent<HTMLElement> | FocusEvent<HTMLDivElement>) => {
    if (event) {
      event.stopPropagation()
    }
    clearTimeout(refTimer.current)
    refTimer.current = setTimeout(() => {
      if (!isVisible) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  })

  return (
    <div className={styles.wrapper} onClick={handleOpen} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <DotsButton />

      {!isMobile && isVisible && (
        <div className={styles.listContainer}>
          <div onClick={handleRemind} className={styles.item}>
            <Column>
              <Text theme={'body-2'}>Remind to sign</Text>
              <Text theme={'body-3'} className='color-text-secondary'>
                Last time was sent on {lastRemind}
              </Text>
            </Column>
          </div>
        </div>
      )}

      {isMobile && (
        <BottomSheet title={title} onClose={handleClose} visible={isVisible}>
          <div onClick={handleRemind} className={styles.item}>
            <Column>
              <Text theme={'body-2'}>Remind to sign</Text>
              <Text theme={'body-3'} className='color-text-secondary'>
                Last time was sent on {lastRemind}
              </Text>
            </Column>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
