import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

export function InputSuccess(props: PropsWithChildren & { isVisibleSuccess?: boolean; className?: string }) {
  const [isDeleted, setDeleted] = useState(false)
  const refTimer = useRef<TimeoutId>()

  useEffect(() => {
    if (props.isVisibleSuccess) {
      refTimer.current = setTimeout(() => setDeleted(true), 3000)
    }
    return () => {
      clearTimeout(refTimer.current)
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
