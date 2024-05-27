import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import { Flex } from 'src/components/ui/grid'

import styles from './styles.module.css'

export function GradientBg(props: PropsWithChildren & { className?: string }) {
  const { className } = props
  return (
    <Flex flex='1' className={cn(styles.bg, className)}>
      {props.children}
    </Flex>
  )
}
