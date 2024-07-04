import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

export function InputSuccess(props: PropsWithChildren & { isVisibleSuccess?: boolean; className?: string }) {
  return (
    <Text
      className={cn(styles.successWrapper, props.className, {
        [styles.show]: props.isVisibleSuccess,
        [styles.hide]: !props.isVisibleSuccess,
      })}
      theme={'body-3'}
    >
      {props.children}
    </Text>
  )
}
