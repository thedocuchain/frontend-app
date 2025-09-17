import React, { ReactElement, Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { InputProps } from 'src/components/ui/input'
import { Input } from 'src/components/ui/input'
import styles from './styles.module.css'

export interface AutoCompleteInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value: string
  onChange: Dispatch<SetStateAction<string>>
  localStorageKey: string
  label?: string
  hint?: string
  isEmail?: boolean
}

export function AutoCompleteInput(props: AutoCompleteInputProps): ReactElement {
  const { localStorageKey, value, onChange, label, hint, isEmail, onBlur, ...inputProps } = props
  const [isVisible, setVisible] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem(localStorageKey)
    if (stored) {
      try {
        const items: string[] = JSON.parse(stored)
        setSuggestions(items.slice(0, 10))
      } catch {
        setSuggestions([])
      }
    }
  }, [localStorageKey])

  const handleFocus = useEvent(() => {
    if (value === '' && suggestions.length > 0) {
      setVisible(true)
    }
  })

  const handleBlur = useEvent((e) => {
    if (onBlur) {
      onBlur(e)
    }
    setTimeout(() => setVisible(false), 100)
  })

  const handleSelect = useEvent((selected: string) => {
    onChange(selected)
    setVisible(false)
  })

  const showDropdown = isVisible && value === '' && suggestions.length > 0

  return (
    <div className={styles.autoCompleteWrapper}>
      <Input
        {...inputProps}
        ref={inputRef}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        hint={hint}
        isEmail={isEmail}
      />
      {showDropdown && (
        <div className={styles.suggestionsList}>
          <div className={styles.suggestionsListHeader}>Previously used</div>
          <div className={styles.suggestionsListContent}>
            {suggestions.map((item) => (
              <div
                key={item}
                className={styles.suggestionItem}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(item)
                }}
              >
                <div className={styles.suggestionText}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
