import React, { FocusEvent, MouseEvent, useRef, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'
import { format } from 'date-fns'

import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { BottomSheet } from 'src/components/ui/dropdown/components/bottomsheet-mobile'
import { DotsButton } from 'src/components/ui/dots-button'
import { Text } from 'src/components/ui/typography'
import { Column } from 'src/components/ui/grid'
import { isMoreThan24HoursString } from 'src/utils/convert-time'

import styles from './styles.module.css'

export function DotsTable(props: { title: string; lastNotifyDate: string }) {
  const { title, lastNotifyDate } = props
  const isMobile = useIsMobile()
  const [isVisible, setVisible] = useState(false)
  const refTimer = useRef<TimeoutId>()
  const lastRemind = lastNotifyDate && format(new Date(lastNotifyDate), 'yyyy-MM-dd HH:mm')

  const handleClose = useEvent(() => {
    setVisible(false)
  })

  const handleRemind = useEvent((event: MouseEvent<HTMLDivElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (!stringLastRemind && !isSuccessSent) {
      setIsSuccessSent(true)
    }
  })

  const handleOpen = useEvent((event?: MouseEvent<HTMLElement> | FocusEvent<HTMLDivElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    clearTimeout(refTimer.current)
    refTimer.current = setTimeout(() => {
      if (!isVisible) {
        setVisible(true)
      }
    })
  })

  const stringLastRemind = isMoreThan24HoursString(lastRemind)
  const [isSuccessSent, setIsSuccessSent] = useState(false)

  return (
    <div className={styles.wrapper} onClick={handleOpen} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <DotsButton />

      {!isMobile && isVisible && (
        <div onClick={handleRemind} className={styles.listContainer}>
          <div className={styles.item}>
            <Column>
              {!isSuccessSent && (
                <>
                  {!stringLastRemind && <Text theme={'body-2'}>Remind to sign</Text>}

                  {stringLastRemind && (
                    <Text theme={'body-2'} className='color-text-warning'>
                      {stringLastRemind}
                    </Text>
                  )}
                </>
              )}

              {isSuccessSent && (
                <Text theme={'body-2'} className='color-text-accent'>
                  Reminder sent successfully!
                </Text>
              )}
              {lastRemind && (
                <Text theme={'body-3'} className='color-text-secondary'>
                  Last time was sent on {lastRemind}
                </Text>
              )}
            </Column>
          </div>
        </div>
      )}

      {isMobile && (
        <BottomSheet title={title} onClose={handleClose} visible={isVisible}>
          <div onClick={handleRemind} className={styles.item}>
            <Column>
              {!isSuccessSent && (
                <>
                  {!stringLastRemind && <Text theme={'body-2'}>Remind to sign</Text>}

                  {stringLastRemind && (
                    <Text theme={'body-2'} className='color-text-warning'>
                      {stringLastRemind}
                    </Text>
                  )}
                </>
              )}

              {isSuccessSent && (
                <Text theme={'body-2'} className='color-text-accent'>
                  Reminder sent successfully!
                </Text>
              )}
              {lastRemind && (
                <Text theme={'body-3'} className='color-text-secondary'>
                  Last time was sent on {lastRemind}
                </Text>
              )}
            </Column>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
