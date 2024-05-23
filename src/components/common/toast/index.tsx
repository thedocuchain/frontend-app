import React, { memo, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { uuid } from '@coxy/utils'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  addItemToast,
  hideItemToast,
  removeAllToasts,
  removeItemToast,
  selectedToasts,
} from 'src/store/reducers/toasts'
import { Text } from 'src/components/ui/typography'
import { Toast } from 'src/store/reducers/toasts/types'

import { ToastContext } from './context'
import styles from './styles.module.css'

type LocalToast = Toast

function ToastElement({ toast }: { toast: LocalToast }) {
  const dispatch = useAppDispatch()
  const [isDeleted, setDeleted] = useState(false)

  useEffect(() => {
    if (toast.isHidden) {
      setDeleted(true)
      setTimeout(() => dispatch(removeItemToast(toast.uuid)), 1300)
    }
  }, [toast.isHidden])

  const style = cn(styles.block, {
    [styles.slideOut]: isDeleted,
  })

  return (
    <>
      {createPortal(
        <div className={styles.root}>
          <div className={styles.wrapperPopup}>
            <div className={styles.overlay}></div>

            <div key={toast.uuid} className={style}>
              <Text theme={'body-2'} className={styles.toastText}>
                {toast.text}
              </Text>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export const ToastsProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()

  const removeToast = useCallback((id: string) => {
    dispatch(hideItemToast(id))
  }, [])

  const addToast = useCallback((el: Omit<Toast, 'uuid'>) => {
    removeAll()
    const newElement = { ...el, uuid: uuid(5) }
    dispatch(addItemToast(newElement))
    const timeout = newElement.timeout || 3000

    if (timeout) {
      setTimeout(() => {
        removeToast(newElement.uuid)
      }, timeout)
    }

    return newElement.uuid
  }, [])

  const removeAll = useCallback(() => {
    dispatch(removeAllToasts())
  }, [])

  return <ToastContext.Provider value={{ removeToast, addToast, removeAll }}>{children}</ToastContext.Provider>
}

export const Toasts = memo(() => {
  const toasts = useAppSelector(selectedToasts) as LocalToast[]

  return (
    <>
      {toasts.map((toast) => (
        <ToastElement toast={toast} key={toast.uuid} />
      ))}
    </>
  )
})
