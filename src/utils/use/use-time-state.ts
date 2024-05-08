import { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

export const useTimeState = (initial = false, time = 2000) => {
  const [status, setIsStatus] = useState(initial)

  const changeState = useEvent((newStatus: boolean) => {
    setIsStatus(newStatus)
    setTimeout(() => setIsStatus(initial), time)
  })

  return [status, changeState] as const
}
