import type { ReactElement, ReactNode, ButtonHTMLAttributes, MouseEvent, PropsWithChildren } from 'react'

import cn from 'classnames'
import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Loader } from 'src/components/ui/loader'
import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

type ComponentProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'link-primary' | 'link-secondary'
  size?: 'sm' | 'standard'
  isLoading?: boolean
  href?: string
}

export function ButtonIcon(props: PropsWithChildren & { stroke?: boolean; className?: string }) {
  return <span className={cn(styles.icon, { [styles.stroke]: props.stroke }, props.className)}>{props.children}</span>
}

export function Button(props: ComponentProps): ReactElement<HTMLButtonElement> {
  const router = useRouter()
  const { isLoading, className, href, onClick, theme, size, ...otherProps } = props
  const cs = cn(styles.button, className, {
    [styles.primary]: theme === undefined || theme === 'primary',
    [styles.secondary]: theme === 'secondary',
    [styles.linkPrimary]: theme === 'link-primary',
    [styles.linkSecondary]: theme === 'link-secondary',
    [styles.sm]: size === 'sm',
    [styles.standard]: size === undefined || size === 'standard',
  })

  const handleClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
    if (href) {
      void router.push(href)
      return
    }

    if (onClick) {
      onClick(event)
    }
  })

  return (
    <div className={styles.wrapper}>
      <button {...otherProps} onClick={handleClick} className={cs}>
        {isLoading && <Loader size={20} color={'black'} />}
        {!isLoading && size === 'sm' && (
          <Text theme='button-sm' className={styles.text}>
            {otherProps.children}
          </Text>
        )}
        {!isLoading && (size === 'standard' || size === undefined) && (
          <Text theme='button-standard' className={styles.text}>
            {otherProps.children}
          </Text>
        )}
      </button>
    </div>
  )
}
