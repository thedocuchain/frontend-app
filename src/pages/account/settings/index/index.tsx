import React, { useContext, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Avatar } from 'src/components/app/avatar'
import { Text } from 'src/components/ui/typography'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Space } from 'src/components/ui/space'
import { ToastContext } from 'src/components/common/toast/context'
import { ConfirmDialog } from 'src/components/app/confirm-dialog'
import { IconChevronRight, IconLogout } from 'src/icons'
import { useApi } from 'src/utils/use/use-api'
import { useAccountLogout } from 'src/utils/use/use-account-logout'
import { useAppSelector } from 'src/store/hooks'
import { selectedAccount } from 'src/store/reducers/account'
import { updateAccountProfile } from 'src/store/reducers/account/actions/profile'
import { deleteAccount } from 'src/store/reducers/account/actions/auth'
import { fileToAvatarDataUrl } from 'src/utils/avatar-image'
import { requireAccountAuth } from 'src/utils/account-guard'

import { ChangePasswordModal } from './components/change-password-modal'
import { SupportModal } from './components/support-modal'
import { DevicesSection } from './components/devices-section'
import styles from './styles.module.css'

export function AccountSettingsPage() {
  const { title } = usePageHead({ title: '| Settings' })
  const toast = useContext(ToastContext)
  const router = useRouter()
  const account = useAppSelector(selectedAccount)

  const logout = useAccountLogout()
  const [isLogoutConfirmVisible, setLogoutConfirmVisible] = useState(false)
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false)
  const [removeAccount, { isLoading: isDeletingAccount }] = useApi(deleteAccount)

  const [tab, setTab] = useState<'profile' | 'security'>('profile')

  const [name, setName] = useState('')
  const [avatarPending, setAvatarPending] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [saveProfile, { isLoading: isSavingProfile }] = useApi(updateAccountProfile)

  const [securityView, setSecurityView] = useState<'menu' | 'devices'>('menu')
  const [activeModal, setActiveModal] = useState<'password' | 'support' | null>(null)

  useEffect(() => {
    if (account) {
      setName(account.name)
    }
  }, [account?.name])

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
      toast.addToast({ text: 'Successfully saved', type: 'success' })
    }
  })

  const handleConfirmLogout = useEvent(async () => {
    setLogoutConfirmVisible(false)
    await logout()
  })

  const handleConfirmDeleteAccount = useEvent(async () => {
    const result = await removeAccount()
    if (!result) {
      toast.addToast({ text: 'Could not delete the account. Please try again later.' })
      return
    }
    setDeleteConfirmVisible(false)
    void router.replace('/')
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
            onClick={() => {
              setTab('security')
              setSecurityView('menu')
            }}
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

            <Space size={20} />
            <div className={styles.divider} />
            <Space size={20} />
            <Button theme='secondary' size='sm' onClick={() => setLogoutConfirmVisible(true)}>
              <ButtonIcon className={styles.logoutIcon}>
                <IconLogout />
              </ButtonIcon>
              Log Out
            </Button>
          </div>
        )}

        {tab === 'security' && securityView === 'menu' && (
          <div className={styles.card}>
            <div className={styles.sectionHeader} onClick={() => setActiveModal('password')}>
              <Text theme='label-1'>Password</Text>
              <IconChevronRight className={styles.chevron} />
            </div>

            <div className={styles.divider} />

            <div className={styles.sectionHeader} onClick={() => setSecurityView('devices')}>
              <Text theme='label-1'>Devices</Text>
              <IconChevronRight className={styles.chevron} />
            </div>

            <div className={styles.divider} />

            <div className={styles.sectionHeader} onClick={() => setActiveModal('support')}>
              <Text theme='label-1'>Support</Text>
              <IconChevronRight className={styles.chevron} />
            </div>

            <div className={styles.divider} />

            <div className={styles.sectionHeader} onClick={() => setDeleteConfirmVisible(true)}>
              <Text theme='label-1' className='color-text-error'>
                Delete account
              </Text>
              <IconChevronRight className={styles.chevron} />
            </div>
          </div>
        )}

        {tab === 'security' && securityView === 'devices' && <DevicesSection onBack={() => setSecurityView('menu')} />}
      </div>

      <ChangePasswordModal visible={activeModal === 'password'} onClose={() => setActiveModal(null)} />
      <SupportModal visible={activeModal === 'support'} onClose={() => setActiveModal(null)} />
      <ConfirmDialog
        visible={isLogoutConfirmVisible}
        title='Are you sure you want to log out?'
        onConfirm={handleConfirmLogout}
        onClose={() => setLogoutConfirmVisible(false)}
      />
      <ConfirmDialog
        visible={isDeleteConfirmVisible}
        title='Delete your account?'
        description='Your profile and documents without other participants will be permanently deleted. This cannot be undone.'
        confirmText='Delete'
        cancelText='Cancel'
        isLoading={isDeletingAccount}
        onConfirm={handleConfirmDeleteAccount}
        onClose={() => setDeleteConfirmVisible(false)}
      />
    </>
  )
}

AccountSettingsPage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuth(context, store)
  return {}
}

AccountSettingsPage.getLayout = AccountLayout
