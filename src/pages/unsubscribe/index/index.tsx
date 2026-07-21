import React, { useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Logotype } from 'src/components/app/logotype'
import { GradientBg } from 'src/components/ui/gradient-bg'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { Loader } from 'src/components/ui/loader'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccount } from 'src/store/reducers/account'
import { getAccount } from 'src/store/reducers/account/actions/profile'
import {
  getReminderSubscription,
  resubscribeReminders,
  unsubscribeReminders,
} from 'src/store/reducers/account/actions/notifications'
import { requireAccountAuthLoginReturn } from 'src/utils/account-guard'

import styles from './styles.module.css'

type Status = 'loading' | 'subscribed' | 'unsubscribed'

export function UnsubscribePage() {
  const { title } = usePageHead({ title: '| Unsubscribe' })
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectedAccount)

  const [status, setStatus] = useState<Status>('loading')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!account) void dispatch(getAccount())
  }, [])

  useEffect(() => {
    void (async () => {
      const result = await dispatch(getReminderSubscription())
      if (getReminderSubscription.fulfilled.match(result) && result.payload) {
        setStatus(result.payload.unsubscribed ? 'unsubscribed' : 'subscribed')
        return
      }
      setError('Could not load your notification settings. Please try again.')
      setStatus('subscribed')
    })()
  }, [])

  const handleUnsubscribe = useEvent(async () => {
    setError('')
    setPending(true)
    const result = await dispatch(unsubscribeReminders())
    setPending(false)
    if (unsubscribeReminders.fulfilled.match(result)) {
      setStatus('unsubscribed')
      return
    }
    setError('Something went wrong. Please try again.')
  })

  const handleResubscribe = useEvent(async () => {
    setError('')
    setPending(true)
    const result = await dispatch(resubscribeReminders())
    setPending(false)
    if (resubscribeReminders.fulfilled.match(result)) {
      setStatus('subscribed')
      return
    }
    setError('Something went wrong. Please try again.')
  })

  return (
    <>
      <PageHead>{title}</PageHead>

      <PageWrapper>
        <header className={styles.header}>
          <Logotype className={styles.logo} />
        </header>
        <GradientBg>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              {status === 'loading' && (
                <div className={styles.loader}>
                  <Loader size={40} color='black' />
                </div>
              )}

              {status === 'subscribed' && (
                <>
                  <Text theme='headline-2' header='h1'>
                    Unsubscribe from reminders
                  </Text>
                  <Space size={12} />
                  <Text theme='body-2' className='color-text-secondary'>
                    {account?.email ? (
                      <>
                        <b>{account.email}</b> will stop
                      </>
                    ) : (
                      'You will stop'
                    )}{' '}
                    receiving reminder emails about documents awaiting signatures. Documents sent to you and account
                    emails will still arrive.
                  </Text>
                  <Space size={24} />
                  <Button onClick={handleUnsubscribe} isLoading={pending} className={styles.submit}>
                    Unsubscribe
                  </Button>
                </>
              )}

              {status === 'unsubscribed' && (
                <>
                  <Text theme='headline-2' header='h1'>
                    You&apos;re unsubscribed
                  </Text>
                  <Space size={12} />
                  <Text theme='body-2' className='color-text-secondary'>
                    {account?.email ? (
                      <>
                        <b>{account.email}</b> won&apos;t
                      </>
                    ) : (
                      "You won't"
                    )}{' '}
                    receive reminder emails anymore. Changed your mind?
                  </Text>
                  <Space size={24} />
                  <Button theme='secondary' onClick={handleResubscribe} isLoading={pending} className={styles.submit}>
                    Resubscribe
                  </Button>
                </>
              )}

              {error && (
                <>
                  <Space size={12} />
                  <Text theme='body-3' className='color-text-error'>
                    {error}
                  </Text>
                </>
              )}
            </div>
          </div>
        </GradientBg>
      </PageWrapper>
    </>
  )
}

UnsubscribePage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuthLoginReturn(context, store, '/unsubscribe')
  return {}
}
