import cn from 'classnames'
import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Text } from 'src/components/ui/typography'
import { IconCheckDot } from 'src/icons'

import styles from './styles.module.css'

type ComponentProps = {
  className?: string
  onChange?: Dispatch<SetStateAction<string>>
  children?: ReactNode
  checked?: boolean
  isVisibleError?: boolean
  isDisabled?: boolean
  name?: string
  value?: string
}

export const RadioBox = (props: ComponentProps) => {
  const { className, children, onChange, isDisabled, isVisibleError, ...otherProps } = props

  return (
    <label
      onChange={() => onChange?.(otherProps.value)}
      className={cn(styles.wrapper, className, {
        [styles.isChecked]: otherProps.checked,
        [styles.error]: isVisibleError,
      })}
      tabIndex={0}
    >
      <input
        type='radio'
        disabled={isDisabled}
        name={props.name}
        onChange={() => onChange?.(otherProps.value)}
        {...otherProps}
      />

      <span className={cn([styles.icon, { [styles.iconDisabled]: isDisabled }])}>
        {otherProps.checked && <IconCheckDot />}
      </span>
      <Text theme='body-3'>{children}</Text>
    </label>
  )
}
