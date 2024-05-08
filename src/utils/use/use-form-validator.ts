import { useCallback, useEffect, useRef, useState } from 'react'
import { ValidatorWrapper, Validity } from '@coxy/react-validator'

export function useFormValidator(form?: unknown) {
  const validator = useRef<ValidatorWrapper>()
  const [isVisibleErrors, setIsVisibleErrors] = useState(false)

  const validate = useCallback((): Validity => {
    if (!validator.current) {
      return
    }
    setIsVisibleErrors(false)
    const response = validator.current.validate()
    if (!response.isValid) {
      setIsVisibleErrors(true)
    }
    return response
  }, [validator])

  useEffect(() => {
    setIsVisibleErrors(false)
  }, [form])

  return [validator, validate, isVisibleErrors, setIsVisibleErrors] as const
}
