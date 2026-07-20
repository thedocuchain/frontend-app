import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { AuthHeader } from 'src/components/app/auth-header'
import { GoogleAuthButton } from 'src/components/app/google-auth-button'
import { GradientBg } from 'src/components/ui/gradient-bg'
import { Text } from 'src/components/ui/typography'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { OtpInput } from 'src/components/ui/otp-input'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccountToken } from 'src/store/reducers/auth'
import {
  registerAccount,
  resendAccountCode,
  verifyAccountEmail,
} from 'src/store/reducers/account/actions/auth'
import { ApiErrorPayload } from 'src/store/reducers/account/actions/api-error'
import { safeInternalPath } from 'src/utils/safe-redirect'

import styles from './styles.module.css'

const RESEND_COOLDOWN_SECONDS = 60

const passwordRules = [
  {
    rule: (value) => !!value && value.length >= 8,
    message: 'Password must be at least 8 characters',
  },
]

export function RegisterPage() {
  const { title } = usePageHead({ title: '| Sign up' })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const rules = useValidatorRules()
  const accountToken = useAppSelector(selectedAccountToken)

  const [step, setStep] = useState<'form' | 'code'>('form')
  const [form, setValue] = useStateForm({ name: '', email: '', password: '' })
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(form)
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  const verifyEmail = router.query.verify as string
  const redirect = safeInternalPath(router.query.redirect)

  useEffect(() => {
    if (accountToken) {
      void router.replace(redirect ?? '/account')
    }
  }, [])

  useEffect(() => {
    if (verifyEmail) {
      setValue('email')(verifyEmail)
      setStep('code')
    }
  }, [verifyEmail])

  useEffect(() => {
    if (!resendCooldown) return
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleRegister = useEvent(async () => {
    const { isValid } = validate()
    if (!isValid) {
      setIsShowError(true)
      return
    }

    setError('')
    setIsLoading(true)
    const result = await dispatch(
      registerAccount({ name: form.name.trim(), email: form.email.trim(), password: form.password }),
    )
    setIsLoading(false)

    if (registerAccount.fulfilled.match(result)) {
      setStep('code')
      setResendCooldown(RESEND_COOLDOWN_SECONDS)
      return
    }
    setError((result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.')
  })

  const handleVerify = useEvent(async () => {
    if (code.length !== 6) {
      setError('Enter the 6-digit code')
      return
    }

    setError('')
    setIsLoading(true)
    const result = await dispatch(verifyAccountEmail({ email: form.email.trim(), code }))
    setIsLoading(false)

    if (verifyAccountEmail.fulfilled.match(result)) {
      void router.replace(redirect ?? '/account')
      return
    }
    setError((result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.')
  })

  const handleResend = useEvent(async () => {
    if (resendCooldown) return

    setError('')
    const result = await dispatch(resendAccountCode({ email: form.email.trim() }))
    if (resendAccountCode.fulfilled.match(result)) {
      setResendCooldown(RESEND_COOLDOWN_SECONDS)
      return
    }
    setError((result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.')
  })

  const handleBackToForm = useEvent(() => {
    setError('')
    setCode('')
    setStep('form')
  })

  const handleGoToLogin = useEvent(() => {
    void router.push(redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login')
  })

  return (
    <>
      <PageHead>{title}</PageHead>

      <PageWrapper>
        <AuthHeader actionLabel='Log in' onAction={handleGoToLogin} />
        <GradientBg>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              {step === 'form' && (
                <>
                  <Text theme='headline-2' header='h1'>
                    Sign up
                  </Text>
                  <Space size={20} />

                  <ValidatorWrapper ref={validator}>
                    <InputValidatorField required rules={rules.name} value={form.name} isVisibleErrors={isShowError}>
                      <Input label='Name' placeholder='John Doe' value={form.name} onChange={setValue('name')} />
                    </InputValidatorField>
                    <Space size={16} />

                    <InputValidatorField required rules={rules.email} value={form.email} isVisibleErrors={isShowError}>
                      <Input
                        label='Email'
                        isEmail
                        placeholder='john.doe@gmail.com'
                        value={form.email}
                        onChange={setValue('email')}
                      />
                    </InputValidatorField>
                    <Space size={16} />

                    <InputValidatorField
                      required
                      rules={passwordRules}
                      value={form.password}
                      isVisibleErrors={isShowError}
                    >
                      <Input
                        label='Password'
                        type='password'
                        placeholder='At least 8 characters'
                        value={form.password}
                        onChange={setValue('password')}
                        onEnter={handleRegister}
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
                  <Button onClick={handleRegister} isLoading={isLoading} className={styles.submit}>
                    Create account
                  </Button>

                  <GoogleAuthButton label='Sign up with Google' redirect={redirect} />
                </>
              )}

              {step === 'code' && (
                <>
                  <Text theme='headline-2' header='h1'>
                    Check your email
                  </Text>
                  <Space size={8} />
                  <Text theme='body-2' className='color-text-secondary'>
                    We sent a 6-digit code to {form.email}. Enter it below to verify your email.
                  </Text>
                  <Space size={20} />

                  <OtpInput value={code} onChange={setCode} isError={!!error} autoFocus />

                  {error && (
                    <>
                      <Space size={12} />
                      <Text theme='body-3' className='color-text-error'>
                        {error}
                      </Text>
                    </>
                  )}

                  <Space size={20} />
                  <Button onClick={handleVerify} isLoading={isLoading} className={styles.submit}>
                    Verify email
                  </Button>

                  <Space size={16} />
                  <div className={styles.switchAuth}>
                    <div className='on-click' onClick={handleResend}>
                      <Text theme='link-2' className={resendCooldown ? 'color-text-secondary' : undefined}>
                        {resendCooldown ? `Resend code in ${resendCooldown}s` : 'Resend code'}
                      </Text>
                    </div>
                    <Text theme='body-2' className='color-text-secondary'>
                      ·
                    </Text>
                    <div className='on-click' onClick={handleBackToForm}>
                      <Text theme='link-2'>Change email</Text>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </GradientBg>
      </PageWrapper>
    </>
  )
}
