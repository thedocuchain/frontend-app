import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import styles from './styles.module.css'

export function OtpInput(props: {
  value: string
  onChange: (value: string) => void
  length?: number
  isError?: boolean
  autoFocus?: boolean
}) {
  const { value, onChange, length = 6, isError, autoFocus } = props
  const refs = useRef<Array<HTMLInputElement | null>>([])

  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const focusInput = (index: number) => {
    refs.current[index]?.focus()
  }

  const setDigit = useEvent((index: number, digit: string) => {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join('').slice(0, length))
  })

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      setDigit(index, '')
      return
    }
    setDigit(index, raw[raw.length - 1])
    if (index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        setDigit(index, '')
      } else if (index > 0) {
        focusInput(index - 1)
        setDigit(index - 1, '')
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    onChange(pasted)
    focusInput(Math.min(pasted.length, length - 1))
  }

  return (
    <div className={styles.wrapper}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el
          }}
          className={cn(styles.box, { [styles.boxError]: isError })}
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          maxLength={1}
          value={digit}
          autoFocus={autoFocus && index === 0}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}
