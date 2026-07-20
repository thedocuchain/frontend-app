import React, { PropsWithChildren } from 'react'

import { AccountLayout } from 'src/components/app/account-layout'
import { useAppSelector } from 'src/store/hooks'
import { selectedAccountToken } from 'src/store/reducers/auth'

export function DocumentLayout({ children }: PropsWithChildren) {
  const accountToken = useAppSelector(selectedAccountToken)

  if (accountToken) {
    return <AccountLayout>{children}</AccountLayout>
  }

  return <>{children}</>
}
