import React from 'react'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { requireAccountAuth } from 'src/utils/account-guard'

import styles from './styles.module.css'

export function AccountBillingPage() {
  const { title } = usePageHead({ title: '| Plans & Billing' })

  return (
    <>
      <PageHead>{title}</PageHead>

      <div className={styles.card}>
        <div className={styles.planRow}>
          <Text theme='headline-4' header='h2'>
            Free plan
          </Text>
          <span className={styles.planBadge}>
            <Text theme='label-3'>Current</Text>
          </span>
        </div>
        <Space size={8} />
        <Text theme='body-2' className='color-text-secondary'>
          You are on the free plan with unlimited document signing. Paid plans with additional features are coming
          soon.
        </Text>
      </div>
    </>
  )
}

AccountBillingPage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuth(context, store)
  return {}
}


AccountBillingPage.getLayout = AccountLayout
