import type { Dispatch, ChangeEvent, InputHTMLAttributes, ReactElement, SetStateAction } from 'react'

import React, { KeyboardEvent, useCallback, useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { IconSearch } from 'src/icons'

import styles from './styles.module.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange?: Dispatch<SetStateAction<string>>
  onEnter?: () => void
  isVisibleError?: boolean
  isSearch?: boolean
}

export function Input(props: InputProps): ReactElement<HTMLInputElement> {
  const { onChange, className, value, onEnter, isVisibleError, isSearch, ...otherProps } = props

  const onChangeInput = useEvent((e: ChangeEvent<HTMLInputElement>) => {
    const regExp = /^(?!\s*$)[0-9a-zA-Z_-]*/gi
    const newStr = e.target.value.match(regExp)

    if (!newStr && onChange) {
      onChange('')
      return
    }

    if (onChange) {
      onChange(newStr[0])
    }
  })

  const onKeyDownInput = useEvent((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && onEnter) {
      onEnter()
    }
  })

  const [, setIsFocus] = useState(false)
  const handleFocus = useCallback(() => setIsFocus(true), [])
  const handleBlur = useCallback(() => setIsFocus(false), [])

  const wrapperStyle = cn(styles.wrapper, {
    [styles.isError]: isVisibleError,
  })

  const inputStyle = cn(styles.input, className, {
    [styles.inputFilled]: value,
    [styles.inputSearch]: isSearch,
  })

  return (
    <div className={wrapperStyle}>
      {isSearch && <IconSearch className={styles.iconSearch} />}
      <input
        type='text'
        spellCheck='false'
        onKeyDown={onKeyDownInput}
        onChange={onChangeInput}
        className={inputStyle}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...otherProps}
      />
      {props.children}
    </div>
  )
}
