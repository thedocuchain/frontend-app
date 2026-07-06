import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { format } from 'date-fns'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Avatar } from 'src/components/app/avatar'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Space } from 'src/components/ui/space'
import { ToastContext } from 'src/components/common/toast/context'
import { IconChevronRight } from 'src/icons'
import { useApi } from 'src/utils/use/use-api'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccount } from 'src/store/reducers/account'
import { AccountSessionItem } from 'src/store/reducers/account/types'
import { updateAccountPassword, updateAccountProfile } from 'src/store/reducers/account/actions/profile'
import { getAccountSessions, revokeAccountSession } from 'src/store/reducers/account/actions/sessions'
import { fileToAvatarDataUrl } from 'src/utils/avatar-image'
import { requireAccountAuth } from 'src/utils/account-guard'

import styles from './styles.module.css'

function formatUserAgent(userAgent: string | null): string {
  if (!userAgent) return 'Unknown device'

  const browser = ['Edg', 'OPR', 'Firefox', 'Chrome', 'Safari'].find((name) => userAgent.includes(name)) ?? 'Browser'
  const os =
    ['iPhone', 'iPad', 'Android', 'Windows', 'Mac OS X', 'Linux'].find((name) => userAgent.includes(name)) ??
    'Unknown OS'

  const browserNames = { Edg: 'Edge', OPR: 'Opera' }
  return `${browserNames[browser] ?? browser} · ${os === 'Mac OS X' ? 'macOS' : os}`
}

export function AccountSettingsPage() {
  const { title } = usePageHead({ title: '| Settings' })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)
  const account = useAppSelector(selectedAccount)

  const [tab, setTab] = useState<'profile' | 'security'>('profile')

  const [name, setName] = useState('')
  const [avatarPending, setAvatarPending] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [saveProfile, { isLoading: isSavingProfile }] = useApi(updateAccountProfile)

  const [openSection, setOpenSection] = useState<'password' | 'sessions' | null>(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [savePassword, { isLoading: isSavingPassword, errorMessage: passwordError, isError: isPasswordError }] =
    useApi(updateAccountPassword)
  const [sessions, setSessions] = useState<AccountSessionItem[] | null>(null)

  useEffect(() => {
    if (account) {
      setName(account.name)
    }
  }, [account?.name])

  const loadSessions = useEvent(async () => {
    const result = await dispatch(getAccountSessions())
    if (getAccountSessions.fulfilled.match(result)) {
      setSessions(result.payload)
    }
  })

  const handleToggleSection = useEvent((section: 'password' | 'sessions') => {
    const next = openSection === section ? null : section
    setOpenSection(next)
    if (next === 'sessions' && !sessions) {
      void loadSessions()
    }
  })

  const handleAvatarSelected = useEvent(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setAvatarPending(await fileToAvatarDataUrl(file))
    } catch {
      toast.addToast({ text: 'Unsupported image. Use a PNG or JPEG file.' })
    }
  })

  const handleSaveProfile = useEvent(async () => {
    if (!name.trim()) {
      toast.addToast({ text: 'Name is required' })
      return
    }

    const result = await saveProfile({
      name: name.trim(),
      ...(avatarPending ? { avatarImage: avatarPending } : {}),
    })
    if (result) {
      setAvatarPending(null)
      toast.addToast({ text: 'Changes saved' })
    }
  })

  const handleSavePassword = useEvent(async () => {
    if (!currentPassword || newPassword.length < 8) {
      toast.addToast({ text: 'New password must be at least 8 characters' })
      return
    }

    const result = await savePassword({ currentPassword, password: newPassword })
    if (result !== null) {
      setCurrentPassword('')
      setNewPassword('')
      setOpenSection(null)
      toast.addToast({ text: 'Password updated' })
    }
  })

  const handleRevokeSession = useEvent(async (id: string) => {
    await dispatch(revokeAccountSession({ id }))
    void loadSessions()
  })

  return (
    <>
      <PageHead>{title}</PageHead>

      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <div className={cn(styles.tab, { [styles.tabActive]: tab === 'profile' })} onClick={() => setTab('profile')}>
            <Text theme='label-1'>Profile</Text>
          </div>
          <div
            className={cn(styles.tab, { [styles.tabActive]: tab === 'security' })}
            onClick={() => setTab('security')}
          >
            <Text theme='label-1'>Security</Text>
          </div>
        </div>

        {tab === 'profile' && account && (
          <div className={styles.card}>
            <Input label='Name' value={name} onChange={setName} placeholder='Your name' />
            <Space size={20} />

            <Text theme='label-2'>Avatar</Text>
            <Space size={8} />
            <div className={styles.avatarRow}>
              <Avatar name={account.name} image={avatarPending ?? account.avatarImage} index={0} size={64} />
              <Button size='sm' onClick={() => avatarInputRef.current?.click()}>
                Upload
              </Button>
              <input
                ref={avatarInputRef}
                type='file'
                accept='image/png,image/jpeg'
                style={{ display: 'none' }}
                onChange={handleAvatarSelected}
              />
            </div>
            <Space size={20} />

            <Input label='Email' value={account.email} disabled onChange={() => undefined} />
            <Space size={6} />
            <Text theme='body-3' className='color-text-secondary'>
              ! due to our service rules, you cannot change your account’s email address
            </Text>

            <Space size={24} />
            <div className={styles.saveRow}>
              <Button size='sm' onClick={handleSaveProfile} isLoading={isSavingProfile}>
                Save changes
              </Button>
            </div>
          </div>
        )}

        {tab === 'security' && (
          <div className={styles.card}>
            <div className={styles.sectionHeader} onClick={() => handleToggleSection('password')}>
              <Text theme='label-1'>Password</Text>
              <IconChevronRight
                className={cn(styles.chevron, { [styles.chevronOpen]: openSection === 'password' })}
              />
            </div>
            {openSection === 'password' && (
              <div className={styles.sectionBody}>
                <Input
                  label='Current password'
                  type='password'
                  value={currentPassword}
                  onChange={setCurrentPassword}
                />
                <Space size={12} />
                <Input
                  label='New password'
                  type='password'
                  placeholder='At least 8 characters'
                  value={newPassword}
                  onChange={setNewPassword}
                />
                {isPasswordError && passwordError && (
                  <>
                    <Space size={8} />
                    <Text theme='body-3' className='color-text-error'>
                      {passwordError}
                    </Text>
                  </>
                )}
                <Space size={16} />
                <div className={styles.saveRow}>
                  <Button size='sm' onClick={handleSavePassword} isLoading={isSavingPassword}>
                    Update password
                  </Button>
                </div>
              </div>
            )}

            <div className={styles.divider} />

            <div className={styles.sectionHeader} onClick={() => handleToggleSection('sessions')}>
              <Text theme='label-1'>Sessions</Text>
              <IconChevronRight
                className={cn(styles.chevron, { [styles.chevronOpen]: openSection === 'sessions' })}
              />
            </div>
            {openSection === 'sessions' && (
              <div className={styles.sectionBody}>
                {!sessions && (
                  <Text theme='body-3' className='color-text-secondary'>
                    Loading sessions…
                  </Text>
                )}
                {sessions?.map((session) => (
                  <div key={session.id} className={styles.sessionRow}>
                    <div className={styles.sessionInfo}>
                      <Text theme='label-2'>{formatUserAgent(session.userAgent)}</Text>
                      <Text theme='body-3' className='color-text-secondary'>
                        {session.ip ?? 'Unknown IP'} · last active{' '}
                        {format(new Date(session.lastActiveAt), 'MMM d, yyyy HH:mm')}
                      </Text>
                    </div>
                    {session.isCurrent ? (
                      <span className={styles.currentBadge}>
                        <Text theme='label-3'>Current</Text>
                      </span>
                    ) : (
                      <Button theme='secondary' size='sm' onClick={() => void handleRevokeSession(session.id)}>
                        Sign out
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.divider} />

            <div className={styles.sectionHeader} onClick={() => void router.push('/feedback')}>
              <Text theme='label-1'>Support</Text>
              <IconChevronRight className={styles.chevron} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

AccountSettingsPage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuth(context, store)
  return {}
}


AccountSettingsPage.getLayout = AccountLayout
