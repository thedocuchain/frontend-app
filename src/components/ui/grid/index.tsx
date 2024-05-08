import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

export function Container(props: PropsWithChildren & { className?: string }) {
  return <div className={cn(styles.container, props.className)}>{props.children}</div>
}

export function Column(props: PropsWithChildren & { className?: string }) {
  return <div className={cn('column', props.className)}>{props.children}</div>
}

export function Row(props: PropsWithChildren & { className?: string }) {
  return <div className={cn('flex-row', props.className)}>{props.children}</div>
}

export function RowCenter(props: PropsWithChildren & { className?: string }) {
  return <div className={cn('flex-row flex-center', props.className)}>{props.children}</div>
}

export function RowBetween(props: PropsWithChildren & { className?: string }) {
  return <div className={cn('flex-between', props.className)}>{props.children}</div>
}

export function RowBetweenCenter(props: PropsWithChildren & { className?: string }) {
  return <div className={cn('flex-between align-center', props.className)}>{props.children}</div>
}

export function Flex(
  props: PropsWithChildren & { flex?: string; className?: string; style?: React.CSSProperties; id?: string },
) {
  if (!props.flex) {
    return (
      <div id={props.id} className={cn(styles.flex, props.className)}>
        {props.children}
      </div>
    )
  }
  return (
    <div
      id={props.id}
      className={cn(styles.flex, props.className)}
      style={Object.assign({ flex: `${props.flex} 1 0%` }, props.style)}
    >
      {props.children}
    </div>
  )
}
