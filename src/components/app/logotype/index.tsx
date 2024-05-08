import React from 'react'
import cn from 'classnames'

import IconLogo from './logo.inline.svg'
import styles from './styles.module.css'

export function Logotype(props: { className?: string }) {
  const { className } = props

  return (
    <a href={'/'}>
      <IconLogo className={cn(styles.logo, className)} width={168} />
    </a>
  )
}
