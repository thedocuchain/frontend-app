import React, { useContext, useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { Modal } from 'src/components/ui/modal'
import { OtpInput } from 'src/components/ui/otp-input'
import { IconArrowRightLong } from 'src/icons'
import { ToastContext } from 'src/components/common/toast/context'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { StepsDocumentPage } from 'src/pages/doc/[id]/index'
import { sendInitiatorCode } from 'src/store/reducers/document/actions/send-initiator-code'
import { confirmInitiatorCode } from 'src/store/reducers/document/actions/confirm-initiator-code'

import styles from './styles.module.css'

const RESEND_SECONDS = 60
const CODE_LENGTH = 6

type ComponentProps = {
  setActiveStep: (step: StepsDocumentPage) => void
}

export function StepVerifyInitiator(props: ComponentProps) {
  const { setActiveStep } = props
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)
  const document = useAppSelector(selectedDocument)

  const [code, setCode] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [isTooMany, setIsTooMany] = useState(false)

  const sendCode = useEvent(async (isInitial: boolean) => {
    const result = await dispatch(sendInitiatorCode({ documentId: document.id })).unwrap()

    if (result?.tooMany) {
      setIsTooMany(true)
      return
    }

    if (!result?.ok && !isInitial) {
      toast.addToast({ text: 'Could not send a new code. Please try again.' })
      return
    }

    setSecondsLeft(RESEND_SECONDS)
  })

  useEffect(() => {
    sendCode(true)
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  const handleResend = useEvent(() => {
    if (secondsLeft > 0) return
    sendCode(false)
  })

  const handleChangeCode = useEvent((value: string) => {
    setIsError(false)
    setCode(value)
  })

  const handleConfirm = useEvent(async () => {
    if (code.length !== CODE_LENGTH) {
      setIsError(true)
      toast.addToast({ text: 'Enter the 6-digit code' })
      return
    }

    setIsLoading(true)
    const result = await dispatch(confirmInitiatorCode({ documentId: document.id, code })).unwrap()
    setIsLoading(false)

    if (result?.ok) {
      setActiveStep('preview-and-send')
    } else {
      setIsError(true)
      toast.addToast({ text: 'Invalid or expired code' })
    }
  })

  return (
    <>
      <Text theme={'headline-1'} className={styles.title}>
        Verify the initiator
      </Text>
      <Text theme={'body-2'} className={styles.desc}>
        We sent a 6-digit code to the initiator&apos;s email. Enter it below.
      </Text>

      <OtpInput value={code} onChange={handleChangeCode} length={CODE_LENGTH} isError={isError} autoFocus />

      <Space size={16} />

      <div className={styles.resendRow}>
        <Button theme={'secondary'} size={'sm'} disabled={secondsLeft > 0} onClick={handleResend}>
          Resend code
        </Button>
        {secondsLeft > 0 && (
          <Text theme={'body-2'} className={'color-text-secondary'}>
            {secondsLeft}
          </Text>
        )}
      </div>

      <div className={styles.buttonsContainer}>
        <Button onClick={() => setActiveStep('add-recipients')} theme={'secondary'} className={styles.button}>
          <ButtonIcon className={styles.backIcon}>
            <IconArrowRightLong />
          </ButtonIcon>
          Back
        </Button>

        <Button isLoading={isLoading} onClick={handleConfirm} theme={'primary'} className={styles.button}>
          Review and send
          <ButtonIcon>
            <IconArrowRightLong />
          </ButtonIcon>
        </Button>
      </div>

      <Modal visible={isTooMany} onClose={() => setIsTooMany(false)}>
        <Text theme={'headline-3'} className={styles.modalTitle}>
          Too many codes!
        </Text>
        <Text theme={'body-2'} className={styles.modalText}>
          Please try again later or reach out to support@docuchain.io
        </Text>
        <Button theme={'primary'} onClick={() => setIsTooMany(false)} className={styles.modalButton}>
          Close
        </Button>
      </Modal>
    </>
  )
}
