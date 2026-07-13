import React, { useContext, useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Space } from 'src/components/ui/space'
import { OtpInput } from 'src/components/ui/otp-input'
import { ToastContext } from 'src/components/common/toast/context'
import { IconClose } from 'src/icons'
import { useAppDispatch } from 'src/store/hooks'
import {
  confirmPasswordReset,
  sendPasswordResetCode,
  updateAccountPassword,
} from 'src/store/reducers/account/actions/profile'
import { ApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

import styles from './styles.module.css'

const RESEND_COOLDOWN_SECONDS = 60

type ChangePasswordModalProps = {
  visible: boolean
  onClose: () => void
}

export function ChangePasswordModal(props: ChangePasswordModalProps) {
  const { visible, onClose } = props
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)

  const [mode, setMode] = useState<'change' | 'code' | 'reset'>('change')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (visible) {
      setMode('change')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setCode('')
      setError('')
      setResendCooldown(0)
    }
  }, [visible])

  useEffect(() => {
    if (!resendCooldown) return
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  useEffect(() => {
    if (mode === 'code' && code.length === 6) {
      setError('')
      setMode('reset')
    }
  }, [code])

  const validateNewPassword = () => {
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return false
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSaveChange = useEvent(async () => {
    setError('')
    if (!validateNewPassword()) return

    setIsLoading(true)
    const result = await dispatch(updateAccountPassword({ currentPassword: oldPassword, password: newPassword }))
    setIsLoading(false)

    if (updateAccountPassword.fulfilled.match(result)) {
      toast.addToast({ text: 'Successfully saved', type: 'success' })
      onClose()
      return
    }
    setError((result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.')
  })

  const handleSendResetCode = useEvent(async () => {
    if (resendCooldown) return

    setError('')
    const result = await dispatch(sendPasswordResetCode())
    if (sendPasswordResetCode.fulfilled.match(result)) {
      setCode('')
      setNewPassword('')
      setConfirmPassword('')
      setMode('code')
      setResendCooldown(RESEND_COOLDOWN_SECONDS)
      return
    }
    setError((result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.')
  })

  const handleSaveReset = useEvent(async () => {
    setError('')
    if (!validateNewPassword()) return

    setIsLoading(true)
    const result = await dispatch(confirmPasswordReset({ code, password: newPassword }))
    setIsLoading(false)

    if (confirmPasswordReset.fulfilled.match(result)) {
      toast.addToast({ text: 'Successfully saved', type: 'success' })
      onClose()
      return
    }

    const message = (result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.'
    if (message.toLowerCase().includes('code')) {
      setCode('')
      setMode('code')
    }
    setError(message)
  })

  return (
    <Modal visible={visible} onClose={onClose} className={styles.modalCard}>
      <div className={styles.closeRow}>
        <IconClose className='on-click' onClick={onClose} />
      </div>

      <Text theme='headline-4' header='h2' className={styles.title}>
        Change password
      </Text>
      <Space size={16} />

      {mode === 'change' && (
        <>
          <Input label='Old password' type='password' value={oldPassword} onChange={setOldPassword} />
          <Space size={12} />
          <Input
            label='New password'
            type='password'
            placeholder='At least 8 characters'
            value={newPassword}
            onChange={setNewPassword}
          />
          <Space size={12} />
          <Input
            label='Confirm new password'
            type='password'
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </>
      )}

      {mode === 'code' && (
        <>
          <Text theme='body-2' className='color-text-secondary'>
            We sent a 6-digit code to your email. Enter it below to reset your password.
          </Text>
          <Space size={16} />
          <OtpInput value={code} onChange={setCode} isError={!!error} autoFocus />
        </>
      )}

      {mode === 'reset' && (
        <>
          <Input
            label='New password'
            type='password'
            placeholder='At least 8 characters'
            value={newPassword}
            onChange={setNewPassword}
          />
          <Space size={12} />
          <Input
            label='Confirm new password'
            type='password'
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </>
      )}

      {error && (
        <>
          <Space size={12} />
          <Text theme='body-3' className='color-text-error'>
            {error}
          </Text>
        </>
      )}

      <Space size={20} />

      {mode === 'change' && (
        <>
          <Button onClick={handleSaveChange} isLoading={isLoading} className={styles.button}>
            Save
          </Button>
          <Space size={14} />
          <div className={styles.forgotRow} onClick={handleSendResetCode}>
            <Text theme='link-2'>
              Forgot your password? <span className={styles.resetLink}>Reset it!</span>
            </Text>
          </div>
        </>
      )}

      {mode === 'code' && (
        <div className={styles.forgotRow} onClick={handleSendResetCode}>
          <Text theme='link-2' className={resendCooldown ? 'color-text-secondary' : undefined}>
            {resendCooldown ? `Resend code in ${resendCooldown}s` : 'Resend code'}
          </Text>
        </div>
      )}

      {mode === 'reset' && (
        <Button onClick={handleSaveReset} isLoading={isLoading} className={styles.button}>
          Save
        </Button>
      )}
    </Modal>
  )
}
