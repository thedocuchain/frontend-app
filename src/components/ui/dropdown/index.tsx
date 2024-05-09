import React, { ReactElement, MouseEvent, useState, FocusEvent, useRef, ReactNode, useEffect } from 'react'
import { ReactClickOutside } from '@coxy/react-click-outside'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'
import cn from 'classnames'

import { IconArrowDown } from 'src/icons'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { BottomSheet } from 'src/components/ui/dropdown/components/bottomsheet-mobile'

import styles from './styles.module.css'

export interface DropdownComponentProps<ItemT> {
  value: ItemT | string
  children?: ReactNode
  data: Array<ItemT>
  keyExtractor: (item: ItemT) => string
  renderItem: (item: ItemT, props?: { renderFrom: 'list' | 'item' }) => ReactNode
  onChange?: (item: ItemT | null) => void
  disabled?: boolean
  label?: string
  hint?: string
  className?: string
  isVisibleError?: boolean
  titleMobile: string
}

export function Dropdown<ItemT = unknown>(props: DropdownComponentProps<ItemT>): ReactElement<HTMLSelectElement> {
  const { value, data, keyExtractor, onChange, disabled, label, hint, className, isVisibleError, titleMobile } = props
  const [isVisible, setVisible] = useState(false)
  const refTimer = useRef<TimeoutId>()
  const filteredData = data
  const isMobile = useIsMobile()

  const handleOpen = useEvent((event?: MouseEvent<HTMLElement> | FocusEvent<HTMLDivElement>) => {
    if (event) {
      event.stopPropagation()
    }
    clearTimeout(refTimer.current)
    refTimer.current = setTimeout(() => {
      if (disabled) {
        return
      }

      if (!isVisible) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  })

  const handleClose = useEvent(() => {
    setVisible(false)
  })

  const handleOpenWithKeyboard = useEvent(() => {
    if (!isVisible) {
      handleOpen()
    }
  })

  const handleChoose = useEvent((item: ItemT) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    handleClose()
    if (onChange) {
      onChange(item)
    }
  })

  const findElementByValue = (value: ItemT | string) => {
    if (typeof value === 'string') {
      return data.find((item) => item === value)
    }
    return value
  }

  const foundElement = findElementByValue(value)
  const renderItem = foundElement ? props.renderItem(foundElement, { renderFrom: 'item' }) : null

  const cw = cn(styles.wrapper, {
    [styles.isOpen]: isVisible,
    [styles.disabled]: disabled,
  })

  const wrapperInputStyle = cn(styles.wrapper, {
    [styles.isError]: isVisibleError,
  })

  const inputStyle = cn(styles.input, className, {
    [styles.inputFilled]: value,
    [styles.disabled]: disabled,
    'color-text-secondary': !renderItem,
  })

  useEffect(() => {
    // scroll list element into view
    if (isVisible) {
      const element = document.getElementById('dropdown-item-active')
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isVisible])

  return (
    <div className={cw} onClick={handleOpen} onKeyUp={handleOpenWithKeyboard}>
      <div className={wrapperInputStyle}>
        {label && (
          <>
            <Text className={'color-text-secondary'} theme={'label-2'}>
              {label}
            </Text>
            <Space size={3} />
          </>
        )}
        <div className={inputStyle}>
          <>
            {!!renderItem && renderItem}
            {!renderItem && 'Select...'}

            <IconArrowDown className={styles.arrow} />
          </>
        </div>

        {hint && !isVisibleError && (
          <>
            <Space size={3} />

            <Text className={'color-text-secondary'} theme={'body-3'}>
              {hint}
            </Text>
          </>
        )}
      </div>

      {!isMobile && (
        <ReactClickOutside onClose={handleClose} visible={isVisible}>
          <div className={styles.listContainer}>
            <div className={styles.list}>
              {filteredData.map((item) => (
                <div onClick={handleChoose(item)} className={styles.item} key={keyExtractor(item)}>
                  {props.renderItem(item, { renderFrom: 'list' })}
                </div>
              ))}
            </div>
          </div>
        </ReactClickOutside>
      )}

      {isMobile && (
        <BottomSheet title={titleMobile} onClose={handleClose} visible={isVisible}>
          <div className={cn(styles.list, styles.listMobile)}>
            {filteredData.map((item) => (
              <div onClick={handleChoose(item)} className={styles.item} key={keyExtractor(item)}>
                {props.renderItem(item, { renderFrom: 'list' })}
              </div>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
