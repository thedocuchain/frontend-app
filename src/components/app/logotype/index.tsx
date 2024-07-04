import React from 'react'
import cn from 'classnames'
import { Link } from '@react-email/components'

import IconLogo from './logo.inline.svg'
import styles from './styles.module.css'

export function Logotype(props: { className?: string }) {
  const { className } = props

  return (
    <Link href={'https://docuchain.io/'} target={'_self'}>
      <IconLogo className={cn(styles.logo, className)} width={168} />
    </Link>
  )
}
