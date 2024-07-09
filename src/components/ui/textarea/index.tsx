import type { ReactElement, ChangeEvent, SetStateAction, Dispatch, InputHTMLAttributes } from 'react'

import React, { useId } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'

import styles from './styles.module.css'

export type TextareaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  onChange?: Dispatch<SetStateAction<string>>
  onEnter?: () => void
  isVisibleError?: boolean
  label?: string
  hint?: string
  rows?: number
  documentShortId?: string
}

export function Textarea(props: TextareaProps): ReactElement<HTMLTextAreaElement> {
  const { onChange, className, value, isVisibleError, label, hint, documentShortId, ...otherProps } = props
  const id = useId()

  const onChangeTextarea = useEvent((e: ChangeEvent<HTMLTextAreaElement>) => {
    const textField = document.getElementById(id)
    if (textField.clientHeight < textField.scrollHeight) {
      textField.style.height = `${textField.scrollHeight}px`
      if (textField.clientHeight < textField.scrollHeight) {
        textField.style.height = `${textField.scrollHeight * 2 - textField.clientHeight}px`
      }
    }

    if (onChange) {
      onChange(e.target.value)
    }
  })

  const wrapperStyle = cn(styles.wrapper, {
    [styles.isError]: isVisibleError,
  })

  const textareaStyle = cn(styles.textarea, className, {
    [styles.textareaFilled]: value,
  })

  const rows = otherProps.rows > 5 ? 5 : otherProps.rows

  return (
    <div className={wrapperStyle}>
      {label && (
        <>
          <Text className={'color-text-secondary'} theme={'label-2'}>
            {label}
          </Text>
          <Space size={3} />
        </>
      )}
      {documentShortId && (
        <div className={styles.id}>
          <Text className={'color-text-secondary'} theme={'body-3'}>
            Document ID: {documentShortId?.toUpperCase()}
          </Text>
        </div>
      )}
      <textarea
        id={id}
        spellCheck='true'
        onChange={onChangeTextarea}
        className={textareaStyle}
        value={value}
        rows={rows}
        {...otherProps}
      />
      {hint && !isVisibleError && (
        <>
          <Space size={3} />

          <Text className={'color-text-secondary'} theme={'body-3'}>
            {hint}
          </Text>
        </>
      )}
      {props.children}
    </div>
  )
}
