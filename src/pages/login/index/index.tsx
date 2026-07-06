import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { GradientBg } from 'src/components/ui/gradient-bg'
import { Text } from 'src/components/ui/typography'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccountToken } from 'src/store/reducers/auth'
import { loginAccount } from 'src/store/reducers/account/actions/auth'
import { ApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

import styles from './styles.module.css'

const passwordRules = [
  {
    rule: (value) => !!value && value.length !== 0,
    message: 'This field is required',
  },
]

export function LoginPage() {
  const { title } = usePageHead({ title: '| Log in' })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const rules = useValidatorRules()
  const accountToken = useAppSelector(selectedAccountToken)

  const [form, setValue] = useStateForm({ email: '', password: '' })
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(form)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (accountToken) {
      void router.replace('/account')
    }
  }, [])

  const handleSubmit = useEvent(async () => {
    const { isValid } = validate()
    if (!isValid) {
      setIsShowError(true)
      return
    }

    setError('')
    setIsLoading(true)
    const result = await dispatch(loginAccount({ email: form.email.trim(), password: form.password }))
    setIsLoading(false)

    if (loginAccount.fulfilled.match(result)) {
      void router.replace('/account')
      return
    }

    const payload = result.payload as ApiErrorPayload
    if (payload?.statusCode === 403) {
      void router.push(`/register?verify=${encodeURIComponent(form.email.trim())}`)
      return
    }
    setError(payload?.message ?? 'Something went wrong. Please try again.')
  })

  return (
    <>
      <PageHead>{title}</PageHead>

      <PageWrapper>
        <GradientBg>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <Text theme='headline-2' header='h1'>
                Log in
              </Text>
              <Space size={20} />

              <ValidatorWrapper ref={validator}>
                <InputValidatorField required rules={rules.email} value={form.email} isVisibleErrors={isShowError}>
                  <Input
                    label='Email'
                    isEmail
                    placeholder='john.doe@gmail.com'
                    value={form.email}
                    onChange={setValue('email')}
                    onEnter={handleSubmit}
                  />
                </InputValidatorField>
                <Space size={16} />

                <InputValidatorField required rules={passwordRules} value={form.password} isVisibleErrors={isShowError}>
                  <Input
                    label='Password'
                    type='password'
                    placeholder='Your password'
                    value={form.password}
                    onChange={setValue('password')}
                    onEnter={handleSubmit}
                  />
                </InputValidatorField>
              </ValidatorWrapper>

              {error && (
                <>
                  <Space size={12} />
                  <Text theme='body-3' className='color-text-error'>
                    {error}
                  </Text>
                </>
              )}

              <Space size={20} />
              <Button onClick={handleSubmit} isLoading={isLoading} className={styles.submit}>
                Log in
              </Button>

              <Space size={16} />
              <div className={styles.switchAuth}>
                <Text theme='body-2' className='color-text-secondary'>
                  Don’t have an account?
                </Text>
                <div className='on-click' onClick={() => void router.push('/register')}>
                  <Text theme='link-2'>Sign up</Text>
                </div>
              </div>
            </div>
          </div>
        </GradientBg>
      </PageWrapper>
    </>
  )
}
