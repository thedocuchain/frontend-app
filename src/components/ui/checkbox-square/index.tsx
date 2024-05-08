import cn from 'classnames'
import { Dispatch, ReactNode, SetStateAction, KeyboardEvent } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { IconCheck, IconMinus } from 'src/icons'
import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

type ComponentProps = {
  className?: string
  onChange?: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
  checked?: boolean
  isVisibleError?: boolean
  isDisabled?: boolean
  isMinusIcon?: boolean
}

export const CheckboxSquare = (props: ComponentProps) => {
  const { className, children, onChange, isMinusIcon, isDisabled, isVisibleError, ...otherProps } = props

  const handleChange = useEvent((event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      onChange(!otherProps.checked)
    }
  })

  return (
    <label
      className={cn(styles.wrapper, className, {
        [styles.isChecked]: otherProps.checked,
        [styles.error]: isVisibleError,
      })}
      tabIndex={0}
      onKeyUp={handleChange}
    >
      <input
        type='checkbox'
        disabled={isDisabled}
        onChange={(event) => onChange(event.target.checked)}
        {...otherProps}
      />

      <span className={cn(styles.icon, { [styles.iconDisabled]: isDisabled })}>
        {isMinusIcon ? <IconMinus /> : <IconCheck />}
      </span>
      <Text theme='body-3'>{children}</Text>
    </label>
  )
}
