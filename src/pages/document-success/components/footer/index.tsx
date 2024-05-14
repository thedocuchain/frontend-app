import React from 'react'

import { Text } from 'src/components/ui/typography'
import { AppLink } from 'src/components/ui/app-link'

import styles from './styles.module.css'

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <footer>
        <Text theme={'body-3'} className={'color-text-secondary'}>
          Want to send a document like this one?
        </Text>
        <AppLink href={'/'} theme={'primary'} className='underline-hover'>
          Check out DocuChain.
        </AppLink>
      </footer>
    </div>
  )
}
