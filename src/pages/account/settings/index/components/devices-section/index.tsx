import React, { useContext, useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { ToastContext } from 'src/components/common/toast/context'
import { IconChevronRight } from 'src/icons'
import { useAppDispatch } from 'src/store/hooks'
import { AccountSessionItem } from 'src/store/reducers/account/types'
import { getAccountSessions, revokeAccountSession } from 'src/store/reducers/account/actions/sessions'

import styles from './styles.module.css'

const ONLINE_THRESHOLD_MS = 15 * 60 * 1000

function formatDeviceName(userAgent: string | null): string {
  if (!userAgent) return 'Unknown device'

  const browser = ['Edg', 'OPR', 'Firefox', 'Chrome', 'Safari'].find((name) => userAgent.includes(name)) ?? 'Browser'
  const os =
    ['iPhone', 'iPad', 'Android', 'Windows', 'Mac OS X', 'Linux'].find((name) => userAgent.includes(name)) ??
    'Unknown OS'

  const browserNames = { Edg: 'Edge', OPR: 'Opera' }
  return `${browserNames[browser] ?? browser} · ${os === 'Mac OS X' ? 'macOS' : os}`
}

function formatLocation(session: AccountSessionItem): string {
  if (!session.country) {
    return session.ip ?? 'Unknown location'
  }
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(session.country) ?? session.country
  } catch {
    return session.country
  }
}

function formatActivity(session: AccountSessionItem): string {
  const lastActive = new Date(session.lastActiveAt)
  if (session.isCurrent || Date.now() - lastActive.getTime() < ONLINE_THRESHOLD_MS) {
    return 'online'
  }
  if (Date.now() - lastActive.getTime() < 24 * 3600 * 1000) {
    return formatDistanceToNow(lastActive, { addSuffix: true })
  }
  return format(lastActive, 'dd.MM.yyyy')
}

export function DevicesSection(props: { onBack: () => void }) {
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)

  const [devices, setDevices] = useState<AccountSessionItem[] | null>(null)
  const [terminateTarget, setTerminateTarget] = useState<AccountSessionItem | null>(null)
  const [isTerminating, setIsTerminating] = useState(false)

  const loadDevices = useEvent(async () => {
    const result = await dispatch(getAccountSessions())
    if (getAccountSessions.fulfilled.match(result)) {
      setDevices(result.payload)
    }
  })

  useEffect(() => {
    void loadDevices()
  }, [])

  const handleTerminate = useEvent(async () => {
    if (!terminateTarget) return

    setIsTerminating(true)
    const result = await dispatch(revokeAccountSession({ id: terminateTarget.id }))
    setIsTerminating(false)
    setTerminateTarget(null)

    if (revokeAccountSession.fulfilled.match(result)) {
      toast.addToast({ text: 'Device has been removed' })
    } else {
      toast.addToast({ text: 'Could not remove the device. Please try again.' })
    }
    void loadDevices()
  })

  return (
    <div className={styles.card}>
      <div className={styles.backRow} onClick={props.onBack}>
        <IconChevronRight className={styles.backIcon} />
        <Text theme='label-2'>Security</Text>
      </div>

      {!devices && (
        <Text theme='body-3' className='color-text-secondary'>
          Loading devices…
        </Text>
      )}

      {devices?.map((device) => (
        <div key={device.id} className={styles.deviceRow}>
          <div className={styles.deviceInfo}>
            <Text theme='label-2'>{formatDeviceName(device.userAgent)}</Text>
            <Text theme='body-3' className='color-text-secondary'>
              {formatLocation(device)} · {formatActivity(device)}
            </Text>
          </div>
          {device.isCurrent ? (
            <span className={styles.currentBadge}>
              <Text theme='label-3'>This device</Text>
            </span>
          ) : (
            <Button size='sm' className={styles.terminateButton} onClick={() => setTerminateTarget(device)}>
              Terminate
            </Button>
          )}
        </div>
      ))}

      <Modal visible={!!terminateTarget} onClose={() => setTerminateTarget(null)} className={styles.confirmCard}>
        <Text theme='headline-4' header='h2' className={styles.confirmTitle}>
          Remove this device?
        </Text>
        <Space size={8} />
        <Text theme='body-2' className={styles.confirmText}>
          {terminateTarget && formatDeviceName(terminateTarget.userAgent)} will be signed out of your account.
        </Text>
        <Space size={20} />
        <Button className={styles.terminateButton} onClick={handleTerminate} isLoading={isTerminating}>
          Yes, remove
        </Button>
        <Space size={10} />
        <Button theme='secondary' onClick={() => setTerminateTarget(null)}>
          No
        </Button>
      </Modal>
    </div>
  )
}
