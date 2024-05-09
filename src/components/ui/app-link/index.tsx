import { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

export function AppLink(
  props: PropsWithChildren & {
    href: string
    target?: '_blank'
    theme?: 'primary' | 'secondary'
  },
) {
  const cs = cn(styles.link, {
    [styles.secondary]: props.theme === 'secondary',
  })

  return (
    <a href={props.href} target={props?.target}>
      <span className={cs}>{props.children}</span>
    </a>
  )
}
