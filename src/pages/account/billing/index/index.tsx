import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { format } from 'date-fns'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { Loader } from 'src/components/ui/loader'
import { ToastContext } from 'src/components/common/toast/context'
import { IconCheck, IconCross } from 'src/icons'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccount } from 'src/store/reducers/account'
import { AccountPlan, BillingStatus } from 'src/store/reducers/account/types'
import { getAccount } from 'src/store/reducers/account/actions/profile'
import { getBillingStatus, openBillingPortal, startCheckout } from 'src/store/reducers/account/actions/billing'
import { requireAccountAuth } from 'src/utils/account-guard'

import styles from './styles.module.css'

type PlanCard = {
  id: AccountPlan
  name: string
  price: string
  features: { text: string; on: boolean }[]
}

const PLANS: PlanCard[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: [
      { text: '1 document per month', on: true },
      { text: 'Up to 2 signers per document', on: true },
      { text: 'AI document review', on: false },
      { text: 'Email reminders for unsigned documents', on: false },
      { text: 'Priority support', on: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$20',
    features: [
      { text: '20 documents per month', on: true },
      { text: 'Up to 4 signers per document', on: true },
      { text: 'AI document review', on: true },
      { text: 'Email reminders for unsigned documents', on: true },
      { text: 'Priority support', on: false },
    ],
  },
  {
    id: 'pro_max',
    name: 'Pro Max',
    price: '$200',
    features: [
      { text: 'Unlimited documents', on: true },
      { text: 'Unlimited signers per document', on: true },
      { text: 'AI document review', on: true },
      { text: 'Email reminders for unsigned documents', on: true },
      { text: 'Priority support', on: true },
    ],
  },
]

const PLAN_NAMES: Record<AccountPlan, string> = { free: 'Free', pro: 'Pro', pro_max: 'Pro Max' }

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : format(date, 'MMM d, yyyy')
}

export function AccountBillingPage() {
  const { title } = usePageHead({ title: '| Plans & Billing' })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)
  const account = useAppSelector(selectedAccount)

  const checkoutResult = router.query.checkout as string | undefined

  const [tab, setTab] = useState<'plans' | 'billing'>('plans')
  const [status, setStatus] = useState<BillingStatus | null>(null)
  const [pending, setPending] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(checkoutResult === 'success')

  const loadStatus = useEvent(async () => {
    const result = await dispatch(getBillingStatus())
    if (getBillingStatus.fulfilled.match(result) && result.payload) {
      setStatus(result.payload)
      return result.payload
    }
    return null
  })

  useEffect(() => {
    void loadStatus()
  }, [])

  useEffect(() => {
    if (checkoutResult === 'cancel') {
      toast.addToast({ text: 'Checkout canceled.' })
      void router.replace('/account/billing', undefined, { shallow: true })
    }
  }, [checkoutResult])

  // The subscription syncs via webhook, so the post-checkout redirect can
  // arrive before our state updates — poll until the plan flips.
  useEffect(() => {
    if (checkoutResult !== 'success') return

    let cancelled = false
    let attempts = 0

    const poll = async () => {
      const current = await loadStatus()
      if (cancelled) return
      attempts += 1
      if (current && current.plan !== 'free') {
        void dispatch(getAccount())
        setConfirming(false)
        return
      }
      if (attempts >= 10) {
        setConfirming(false)
        return
      }
      setTimeout(() => void poll(), 2000)
    }

    void poll()
    return () => {
      cancelled = true
    }
  }, [checkoutResult])

  const handleBuy = useEvent(async (plan: 'pro' | 'pro_max') => {
    setPending(plan)
    const result = await dispatch(startCheckout({ plan }))
    if (startCheckout.fulfilled.match(result) && result.payload?.url) {
      window.open(result.payload.url, '_self')
      return
    }
    setPending(null)
    toast.addToast({ text: (result.payload as { message?: string })?.message ?? 'Could not start checkout.' })
  })

  const handlePortal = useEvent(async () => {
    setPending('portal')
    const result = await dispatch(openBillingPortal())
    if (openBillingPortal.fulfilled.match(result) && result.payload?.url) {
      window.open(result.payload.url, '_self')
      return
    }
    setPending(null)
    toast.addToast({ text: (result.payload as { message?: string })?.message ?? 'Could not open billing.' })
  })

  const currentPlan: AccountPlan = status?.plan ?? account?.plan ?? 'free'
  const billingEnabled = status?.billingEnabled ?? false
  const hasSubscription = currentPlan !== 'free'

  const renderPlanAction = (plan: PlanCard) => {
    const isCurrent = currentPlan === plan.id

    if (plan.id === 'free') {
      if (isCurrent) {
        return (
          <div className={styles.currentPlanBadge}>
            <Text theme='label-2' className='color-text-secondary'>
              Current plan
            </Text>
          </div>
        )
      }
      return null
    }

    if (isCurrent) {
      return (
        <div className={styles.activeBlock}>
          {status?.currentPeriodEnd && (
            <div className={styles.activeText}>
              <Text theme='label-2'>
                {status.cancelAtPeriodEnd ? 'Cancels on' : 'Active until'} {formatDate(status.currentPeriodEnd)}
              </Text>
              <Text theme='body-3' className='color-text-secondary'>
                {status.cancelAtPeriodEnd ? 'Reverts to Free afterwards' : 'Renews automatically'}
              </Text>
            </div>
          )}
          <button className={cn(styles.cancelLink, 'on-click')} onClick={handlePortal} disabled={!!pending}>
            <Text theme='label-3'>{status?.cancelAtPeriodEnd ? 'Manage plan' : 'Cancel plan'}</Text>
          </button>
        </div>
      )
    }

    const planId = plan.id as 'pro' | 'pro_max'

    if (hasSubscription) {
      return (
        <Button theme='secondary' onClick={handlePortal} isLoading={pending === 'portal'} className={styles.action}>
          Switch to {plan.name}
        </Button>
      )
    }

    return (
      <Button
        onClick={() => void handleBuy(planId)}
        isLoading={pending === planId}
        disabled={!billingEnabled}
        className={styles.action}
      >
        Buy {plan.name}
      </Button>
    )
  }

  if (checkoutResult === 'success') {
    const planName = PLAN_NAMES[currentPlan]
    return (
      <>
        <PageHead>{title}</PageHead>
        <div className={styles.confirmWrapper}>
          <div className={styles.confirmCard}>
            {confirming ? (
              <>
                <Loader size={40} color='black' />
                <Space size={16} />
                <Text theme='headline-4' header='h2'>
                  Finalizing your subscription…
                </Text>
                <Text theme='body-2' className='color-text-secondary'>
                  This only takes a moment.
                </Text>
              </>
            ) : (
              <>
                <span className={styles.confirmCheck}>
                  <IconCheck />
                </span>
                <Space size={16} />
                <Text theme='headline-4' header='h2'>
                  You are on {planName}
                </Text>
                <Space size={6} />
                <Text theme='body-2' className='color-text-secondary'>
                  {currentPlan === 'pro'
                    ? '20 documents a month, 4 signers per document, AI review and email reminders are unlocked.'
                    : currentPlan === 'pro_max'
                      ? 'Unlimited documents and signers, AI review, email reminders and priority support are unlocked.'
                      : 'Your subscription is being processed.'}
                </Text>
                <Space size={20} />
                <Button onClick={() => void router.replace('/account/billing', undefined, { shallow: true })}>
                  Back to Plans
                </Button>
              </>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHead>{title}</PageHead>

      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <div className={cn(styles.tab, { [styles.tabActive]: tab === 'plans' })} onClick={() => setTab('plans')}>
            <Text theme='label-1'>Plans</Text>
          </div>
          <div
            className={cn(styles.tab, { [styles.tabActive]: tab === 'billing' })}
            onClick={() => setTab('billing')}
          >
            <Text theme='label-1'>Billing</Text>
          </div>
        </div>

        {tab === 'plans' && (
          <>
            {!billingEnabled && (
              <div className={styles.notice}>
                <Text theme='body-2' className='color-text-secondary'>
                  Paid plans aren’t available yet — you’re on the Free plan.
                </Text>
              </div>
            )}

            <div className={styles.cards}>
              {PLANS.map((plan) => {
                const isCurrent = currentPlan === plan.id
                return (
                  <div key={plan.id} className={cn(styles.card, { [styles.cardCurrent]: isCurrent })}>
                    <Text theme='headline-4' header='h3'>
                      {plan.name}
                    </Text>
                    <div className={styles.priceRow}>
                      <Text theme='headline-2' header='h2'>
                        {plan.price}
                      </Text>
                      <Text theme='body-3' className='color-text-secondary'>
                        / month
                      </Text>
                    </div>

                    <div className={styles.features}>
                      {plan.features.map((feature) => (
                        <div
                          key={feature.text}
                          className={cn(styles.feature, { [styles.featureOff]: !feature.on })}
                        >
                          <span className={cn(styles.featureIcon, feature.on ? styles.iconOn : styles.iconOff)}>
                            {feature.on ? <IconCheck /> : <IconCross />}
                          </span>
                          <Text theme='body-3'>{feature.text}</Text>
                        </div>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>{renderPlanAction(plan)}</div>
                  </div>
                )
              })}
            </div>

            {hasSubscription && billingEnabled && (
              <div className={styles.manageRow}>
                <button className={cn(styles.linkButton, 'on-click')} onClick={handlePortal} disabled={!!pending}>
                  <Text theme='label-2'>Manage billing</Text>
                </button>
              </div>
            )}
          </>
        )}

        {tab === 'billing' && (
          <div className={styles.billingCard}>
            {hasSubscription ? (
              <>
                <Text theme='label-1'>Payment & invoices</Text>
                <Space size={8} />
                <Text theme='body-2' className='color-text-secondary'>
                  Update your card, download invoices, or cancel your plan from the secure Stripe portal.
                </Text>
                <Space size={16} />
                <Button onClick={handlePortal} isLoading={pending === 'portal'}>
                  Manage billing
                </Button>
              </>
            ) : (
              <Text theme='body-2' className='color-text-secondary'>
                You’re on the Free plan. Billing details will appear here once you subscribe to a paid plan.
              </Text>
            )}
          </div>
        )}
      </div>
    </>
  )
}

AccountBillingPage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuth(context, store)
  return {}
}

AccountBillingPage.getLayout = AccountLayout
