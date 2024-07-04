import React, { FocusEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'
import { format } from 'date-fns'
import cn from 'classnames'

import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { BottomSheet } from 'src/components/ui/dropdown/components/bottomsheet-mobile'
import { DotsButton } from 'src/components/ui/dots-button'
import { Text } from 'src/components/ui/typography'
import { Column } from 'src/components/ui/grid'
import { isMoreThan24HoursString } from 'src/utils/convert-time'
import { useApi } from 'src/utils/use/use-api'
import { remindUser } from 'src/store/reducers/document/actions/remind'
import { User } from 'src/store/reducers/document/types'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'

import styles from './styles.module.css'

export function DotsTable(props: { user: User }) {
  const { user } = props
  const documentId = useAppSelector(selectedDocument).id
  const title = `Actions for ${user.name}`
  const lastNotifyDate = user?.lastNotifyDate
  const isMobile = useIsMobile()
  const [isVisible, setVisible] = useState(false)
  const refTimer = useRef<TimeoutId>()
  const lastRemind = lastNotifyDate && format(new Date(lastNotifyDate), 'yyyy-MM-dd HH:mm')
  const [remind, { isSuccess }] = useApi(remindUser)
  const isError = user.notifyStatus === 'error'
  const isNotDelivered = user.notifyStatus === 'not sent'
  const isHover = user.notifyStatus === 'delivered' && !isMoreThan24HoursString(lastRemind)

  const handleClose = useEvent(() => {
    setVisible(false)
  })

  const handleRemind = useEvent(async (event: MouseEvent<HTMLDivElement>) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (isError) return
    if (isNotDelivered) return

    if (!stringLastRemind && !isSuccessSent) {
      await remind({
        userId: user.id,
        documentId,
      })
    }
  })

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessSent(true)
    }
  }, [isSuccess])

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

  const stringLastRemind = lastRemind && isMoreThan24HoursString(lastRemind)
  const [isSuccessSent, setIsSuccessSent] = useState(false)

  useEffect(() => {
    if (isSuccessSent) {
      setTimeout(() => setIsSuccessSent(false), 2000)
    }
  }, [isSuccessSent])

  function TextRemindComponent() {
    if (isError)
      return (
        <Text theme={'body-2'} className='color-text-warning'>
          We can&apos;t deliver email to this address. Please check the email is correct.
        </Text>
      )
    if (isNotDelivered)
      return (
        <Text theme={'body-2'}>
          We are trying to deliver this email. <br />
          Please wait.
        </Text>
      )
    return (
      <>
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
      </>
    )
  }

  return (
    <div className={styles.wrapper} onClick={handleOpen} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <DotsButton />

      {!isMobile && isVisible && (
        <div onClick={handleRemind} className={styles.listContainer}>
          <div className={cn(styles.item, { [styles.itemHover]: isHover })}>
            <Column>
              <TextRemindComponent />
            </Column>
          </div>
        </div>
      )}

      {isMobile && (
        <BottomSheet title={title} onClose={handleClose} visible={isVisible}>
          <div onClick={handleRemind} className={cn(styles.item, { [styles.itemHover]: isHover })}>
            <Column>
              <TextRemindComponent />
            </Column>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
