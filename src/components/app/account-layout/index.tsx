import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Text } from 'src/components/ui/typography'
import { Avatar } from 'src/components/app/avatar'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccountToken } from 'src/store/reducers/auth'
import { selectedAccount, selectedNewDocumentsCount } from 'src/store/reducers/account'
import { getAccount } from 'src/store/reducers/account/actions/profile'
import { getAccountDocuments } from 'src/store/reducers/account/actions/documents'
import { useAccountLogout } from 'src/utils/use/use-account-logout'
import { ConfirmDialog } from 'src/components/app/confirm-dialog'
import { IconDocs, IconDollar, IconGear, IconLogout, IconSidebarToggle, IconSignatureNav } from 'src/icons'
import IconLogo from 'src/components/app/logotype/logo.inline.svg'

import styles from './styles.module.css'

const COLLAPSED_STORAGE_KEY = '@app/account-sidebar-collapsed'

const NAV_ITEMS = [
  { href: '/account', label: 'My documents', icon: IconDocs, exact: true, withBadge: true },
  { href: '/account/signature', label: 'My signature', icon: IconSignatureNav },
  { href: '/account/billing', label: 'Plans & Billing', icon: IconDollar },
  { href: '/account/settings', label: 'Settings', icon: IconGear },
]

export function AccountLayout(props: PropsWithChildren & { flush?: boolean }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accountToken = useAppSelector(selectedAccountToken)
  const account = useAppSelector(selectedAccount)
  const newDocumentsCount = useAppSelector(selectedNewDocumentsCount)
  const logout = useAccountLogout()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLogoutConfirmVisible, setLogoutConfirmVisible] = useState(false)

  useEffect(() => {
    setIsCollapsed(localStorage.getItem(COLLAPSED_STORAGE_KEY) === '1')
  }, [])

  useEffect(() => {
    if (!accountToken) {
      void router.replace('/login')
      return
    }

    if (!account) {
      void dispatch(getAccount())
    }
    void dispatch(getAccountDocuments())
  }, [accountToken])

  const handleToggleCollapsed = useEvent(() => {
    setIsCollapsed((value) => {
      localStorage.setItem(COLLAPSED_STORAGE_KEY, value ? '0' : '1')
      return !value
    })
  })

  const handleConfirmLogout = useEvent(async () => {
    setLogoutConfirmVisible(false)
    await logout()
  })

  if (!accountToken) {
    return null
  }

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    item.exact ? router.pathname === item.href : router.pathname.startsWith(item.href)

  const profileBlock = account && (
    <>
      <Avatar name={account.name} image={account.avatarImage} index={0} size={40} />
      {!isCollapsed && (
        <div className={styles.profileText}>
          <Text theme='label-2' className={styles.profileName}>
            {account.name}
          </Text>
          <Text theme='body-3' className={cn('color-text-secondary', styles.profileEmail)}>
            {account.email}
          </Text>
        </div>
      )}
    </>
  )

  const badge = newDocumentsCount > 0 && (
    <span className={styles.navBadge}>
      <Text theme='label-3'>{newDocumentsCount}</Text>
    </span>
  )

  return (
    <div className={styles.layout}>
      <aside className={cn(styles.sidebar, { [styles.collapsed]: isCollapsed })}>
        <div className={styles.sidebarHeader}>
          {!isCollapsed && (
            <div className={styles.logo}>
              <IconLogo width={150} />
            </div>
          )}
          <button className={styles.collapseButton} onClick={handleToggleCollapsed} aria-label='Toggle sidebar'>
            <IconSidebarToggle className={styles.navIcon} />
          </button>
        </div>

        <div className={styles.profile}>{profileBlock}</div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.href}
              className={cn(styles.navItem, { [styles.active]: isActive(item) })}
              onClick={() => void router.push(item.href)}
            >
              <item.icon className={styles.navIcon} />
              {!isCollapsed && (
                <>
                  <Text theme='label-2' className={styles.navLabel}>
                    {item.label}
                  </Text>
                  {item.withBadge && badge}
                </>
              )}
            </div>
          ))}
        </nav>

        <div
          className={cn(styles.navItem, styles.logoutItem)}
          onClick={() => setLogoutConfirmVisible(true)}
        >
          <IconLogout className={styles.navIcon} />
          {!isCollapsed && (
            <Text theme='label-2' className={styles.navLabel}>
              Log Out
            </Text>
          )}
        </div>
      </aside>

      <header className={styles.mobileHeader}>
        <IconLogo width={140} />
        {account && (
          <div className={styles.mobileProfile}>
            <Text theme='label-2'>{account.name}</Text>
            <Avatar name={account.name} image={account.avatarImage} index={0} />
          </div>
        )}
      </header>

      <main className={cn(styles.content, { [styles.flush]: props.flush })}>{props.children}</main>

      <nav className={styles.tabBar}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.href}
            className={cn(styles.tabItem, { [styles.active]: isActive(item) })}
            onClick={() => void router.push(item.href)}
          >
            <span className={styles.tabIcon}>
              <item.icon className={styles.navIcon} />
              {item.withBadge && badge}
            </span>
            <Text theme='label-3' className={styles.tabLabel}>
              {item.label}
            </Text>
          </div>
        ))}
      </nav>

      <ConfirmDialog
        visible={isLogoutConfirmVisible}
        title='Are you sure you want to log out?'
        onConfirm={handleConfirmLogout}
        onClose={() => setLogoutConfirmVisible(false)}
      />
    </div>
  )
}
