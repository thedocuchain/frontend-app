import React from 'react'

import { Logotype } from 'src/components/app/logotype'

import styles from './styles.module.css'

export function PortalHeader() {
  return (
    <header className={styles.header}>
      <Logotype className={styles.logo} />
    </header>
  )
}
