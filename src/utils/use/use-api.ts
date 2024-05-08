import { useCallback, useState } from 'react'
import { AsyncThunk } from '@reduxjs/toolkit'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { useAppDispatch } from 'src/store/hooks'

// eslint-disable-next-line @typescript-eslint/ban-types
export const useApi = <R, Params>(thunk: AsyncThunk<R, Params, {}>) => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const resetStatus = useEvent(() => {
    setIsLoading(false)
    setIsError(false)
    setIsSuccess(false)
  })

  const cb = useCallback(async (args: Params): Promise<R> => {
    let response = null
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)
    try {
      response = await dispatch(thunk(args)).unwrap()
      if (response.message && response.error && response.status === 'FAIL') {
        throw new Error(response)
      }
      setIsSuccess(true)
    } catch (err) {
      if (err.message) {
        setErrorMessage(err.message)
      }
      setIsError(true)
      setIsSuccess(false)
      setIsLoading(false)
      return null
    }
    setIsLoading(false)

    return response
  }, [])

  return [cb, { isLoading, isError, isSuccess, resetStatus, errorMessage }] as const
}
