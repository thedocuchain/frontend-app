import type { PropsWithChildren } from 'react'

import cn from 'classnames'

import styles from './styles.module.css'

type ComponentProps = {
  size?: 16 | 24 | 32 | 44 | 64
  color?: string
  className?: string
}

export function IconWrapper(props: PropsWithChildren & ComponentProps) {
  const cl = cn(styles.icon, props.className, {
    [styles.size16]: props.size === 16,
    [styles.size24]: props.size === 24 || props.size === undefined,
    [styles.size32]: props.size === 32,
    [styles.size44]: props.size === 44,
    [styles.size64]: props.size === 64,
    [styles.color]: props.color,
  })

  return <span className={cl}>{props.children}</span>
}
