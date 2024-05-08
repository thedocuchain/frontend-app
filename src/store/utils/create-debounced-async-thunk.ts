// based on:
// https://stackoverflow.com/questions/68281810/how-to-debounce-createasyncthunk-from-redux-toolkit

import { createAsyncThunk, AsyncThunkPayloadCreator, AsyncThunk } from '@reduxjs/toolkit'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

type DebounceSettings = {
  wait: number

  /**
   * The maximum time `payloadCreator` is allowed to be delayed before
   * it is invoked.
   * @defaultValue `0`.
   */
  maxWait?: number
  /**
   * Specify invoking on the leading edge of the timeout.
   * @defaultValue `false`.
   */
  leading?: boolean
}

const createDebouncedAsyncThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  options: DebounceSettings,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>,
): AsyncThunk<Returned, ThunkArg, object> => {
  const { maxWait = 0, leading = false } = options ?? {}
  let timer: string | number | TimeoutId = 0
  let maxTimer: string | number | TimeoutId = 0
  let res: ((value: boolean) => void) | undefined
  const invoke = (): void => {
    clearTimeout(maxTimer)
    maxTimer = 0

    if (res) {
      res(true)
      res = undefined
    }
  }
  const cancel = (): void => {
    if (res) {
      res(false)
      res = undefined
    }
  }

  return createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator as never, {
    condition() {
      const immediate = leading && !timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        invoke()
        timer = 0
      }, options.wait)

      if (immediate) return true

      cancel()

      if (maxWait && !maxTimer) maxTimer = setTimeout(invoke, maxWait)

      return new Promise<boolean>((resolve) => {
        res = resolve
      })
    },
  })
}

/*
  Then debouncedAsyncThunk rejected it throws ConditionError
*/
export const isConditionError = (
  toBeDetermined: unknown,
): toBeDetermined is { name: 'ConditionError'; message: string } =>
  (toBeDetermined as { name: 'ConditionError'; message: string })?.name === 'ConditionError'

export default createDebouncedAsyncThunk
