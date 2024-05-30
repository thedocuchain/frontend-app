import React, { PropsWithChildren, useEffect, useState } from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

export function InputSuccess(props: PropsWithChildren & { isVisibleSuccess?: boolean; className?: string }) {
  const [isDeleted, setDeleted] = useState(false)

  useEffect(() => {
    if (props.isVisibleSuccess) {
      setTimeout(() => setDeleted(true), 3000)
    }
  }, [props.isVisibleSuccess])

  if (props.isVisibleSuccess === false) {
    return null
  }

  return (
    <Text className={cn(styles.successWrapper, props.className, { [styles.hide]: isDeleted })} theme={'body-3'}>
      {props.children}
    </Text>
  )
}
