import React from 'react'

import { Text } from 'src/components/ui/typography'
import { Logotype } from 'src/components/app/logotype'

import styles from './styles.module.css'

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Logotype />
      <Text theme={'body-2'} className={'color-text-secondary'}>
        © {new Date().getFullYear()} DocuChain. All rights reserved.
      </Text>
    </footer>
  )
}
