import { createContext } from 'react'

import { Toast } from 'src/store/reducers/toasts/types'

type ContextTypes = {
  addToast: (el: Omit<Toast, 'uuid'>) => string
  removeToast: (id: string) => void
  removeAll: () => void
}

export const ToastContext = createContext<ContextTypes>({
  addToast: () => '',
  removeToast: () => undefined,
  removeAll: () => undefined,
})
