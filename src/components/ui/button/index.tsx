import type { ReactElement, ReactNode, ButtonHTMLAttributes, MouseEvent, PropsWithChildren } from 'react'

import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Loader } from 'src/components/ui/loader'
import { Text } from 'src/components/ui/typography'
import { handleOpenLink } from 'src/utils/navigation'

import styles from './styles.module.css'

export function ButtonIcon(props: PropsWithChildren & { stroke?: boolean; className?: string }) {
  return <span className={cn(styles.icon, { [styles.stroke]: props.stroke }, props.className)}>{props.children}</span>
}

export function ButtonWrapper(
  props: PropsWithChildren & { id?: string; onClick?: () => void; href?: string; className?: string },
) {
  const { href, onClick, className } = props

  const handleClick = useEvent(() => {
    if (href) {
      handleOpenLink(href)
      return
    }

    if (onClick) {
      onClick()
    }
  })

  return (
    <div onClick={handleClick} className={cn('on-click', className)} id={props.id}>
      {props.children}
    </div>
  )
}

type ComponentProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'link-primary' | 'link-secondary' | 'dark' | 'gradient'
  size?: 'sm' | 'standard'
  isLoading?: boolean
  href?: string
  disabled?: boolean
}

export function Button(props: ComponentProps): ReactElement<HTMLButtonElement> {
  const { isLoading, className, href, onClick, theme, size, disabled, ...otherProps } = props
  const cs = cn(styles.button, className, {
    [styles.primary]: theme === undefined || theme === 'primary',
    [styles.secondary]: theme === 'secondary',
    [styles.dark]: theme === 'dark',
    [styles.gradient]: theme === 'gradient',
    [styles.linkPrimary]: theme === 'link-primary',
    [styles.linkSecondary]: theme === 'link-secondary',
    [styles.sm]: size === 'sm',
    [styles.standard]: size === undefined || size === 'standard',
  })

  const handleClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
    if (href && !disabled) {
      window.open(href, '_self')
      return
    }

    if (onClick) {
      onClick(event)
    }
  })

  return (
    <div className={styles.wrapper}>
      <button {...otherProps} onClick={handleClick} className={cs} disabled={disabled}>
        {isLoading && <Loader size={20} color={theme === 'dark' ? 'white' : 'black'} />}

        {!isLoading && size === 'sm' && (
          <Text theme='button-standard' className={styles.text}>
            {otherProps.children}
          </Text>
        )}
        {!isLoading && (size === 'standard' || size === undefined) && (
          <Text theme='button-big' className={styles.text}>
            {otherProps.children}
          </Text>
        )}
      </button>
    </div>
  )
}
