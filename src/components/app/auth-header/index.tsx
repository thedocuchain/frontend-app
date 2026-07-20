import React from 'react'

import { Logotype } from 'src/components/app/logotype'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

type AuthHeaderProps = {
  actionLabel: string
  onAction: () => void
}

export function AuthHeader({ actionLabel, onAction }: AuthHeaderProps) {
  return (
    <header className={styles.header}>
      <Logotype className={styles.logo} />
      <Button theme='secondary' size='sm' onClick={onAction}>
        {actionLabel}
      </Button>
    </header>
  )
}
