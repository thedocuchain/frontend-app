import React from 'react'

import { IconDots } from 'src/icons'

import styles from './styles.module.css'

export const DotsButton = (props: { onClick?: () => void }) => {
  return (
    <div onClick={props.onClick} className={styles.dotsIcon}>
      <IconDots />
    </div>
  )
}
