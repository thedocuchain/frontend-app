import { useEvent } from '@coxy/utils/dist/use/use-event'

import { copyToClipboard } from 'src/utils/clipboard'

import { useTimeState } from './use-time-state'

export function useClipboard() {
  const [status, changeState] = useTimeState(false, 1000)

  const handleCopy = useEvent((str) => () => {
    copyToClipboard(str)
    changeState(true)
  })

  return [handleCopy, status] as const
}
