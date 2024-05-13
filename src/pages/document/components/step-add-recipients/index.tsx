import React, { useContext, useEffect, useMemo } from 'react'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { ToastContext } from 'src/components/common/toast/context'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { Text } from 'src/components/ui/typography'
import { Textarea } from 'src/components/ui/textarea'
import { Space } from 'src/components/ui/space'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconArrowRightLong, IconUser } from 'src/icons'
import { Recipient } from 'src/store/reducers/document/types'
import { RecepientForm } from 'src/components/app/recepient-form'

import styles from './styles.module.css'

type ComponentProps = {
  signers: Recipient[]
  setSigners: (signers: Recipient[]) => void
  setActiveStep: (step: string) => void
  steps: string[]
  activeStep: string
}

export function StepAddRecipients(props: ComponentProps): JSX.Element {
  const { signers, setSigners, setActiveStep, steps, activeStep } = props
  const rules = useValidatorRules()
  const toast = useContext(ToastContext)

  // todo documentName & documentId
  const documentName = 'Contractor Agreement'
  const documentId = 'Y16334'

  const [form, setValue] = useStateForm({
    documentName,
  })
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(form)

  const handleAddOneRecipient = useEvent(() => {
    setSigners([
      ...signers,
      {
        name: '',
        email: '',
        role: 'signer',
      },
    ])
  })
  const isNoSigners = useMemo(() => signers.every((el) => el.role === 'watcher'), [signers])

  const handleAddRecipients = useEvent((form: Recipient, indexFind: number) => {
    setSigners(signers.map((el, index) => (index === indexFind ? form : el)))
  })

  const handleDeleteRecipient = useEvent((indexDelete: number) => {
    if (signers.length === 1) return
    setSigners(signers.filter((el, index) => index !== indexDelete))
  })

  const handleCheckRecipients = useEvent(async () => {
    setIsShowError(false)
    const { isValid, message } = validate()
    // const isNoSigners = signers.every((el) => el.role === 'watcher')

    if (validator.current) {
      validator.current.clearCustomErrors()
    }

    if (!isValid || isNoSigners) {
      setIsShowError(true)

      toast.addToast({
        text: message,
      })

      if (isNoSigners) {
        setIsShowError(true)
        await validator.current.setCustomError({
          id: 'role',
          message: 'Select at least 1 signer.',
          isValid: false,
        })

        toast.addToast({
          text: 'Select at least 1 signer.',
        })
      }

      return
    }

    setActiveStep('Preview and send')
  })

  useEffect(() => {
    setIsShowError(false)
  }, [form, isNoSigners])

  return (
    <>
      <div className='show-mobile'>
        <Text theme={'label-2'} className='color-text-secondary'>
          Step {steps.findIndex((el) => el === activeStep) + 1} of {steps.length} - {activeStep}
        </Text>
        <Space size={24} />
      </div>

      <Text theme={'headline-1'} className={styles.title}>
        Add recepients
      </Text>
      <Text theme={'body-2'} className={styles.desc}>
        Check the document name and choose who needs to sign it.
      </Text>
      <ValidatorWrapper ref={validator}>
        <InputValidatorField
          required
          rules={rules.documentName}
          value={form.documentName}
          isVisibleErrors={isShowError}
        >
          <Textarea
            documentId={documentId}
            label={'Document name'}
            placeholder='Enter document name'
            value={form.documentName}
            onChange={setValue('documentName')}
          />
        </InputValidatorField>
        <Space size={24} />

        {signers?.map((el, index) => (
          <RecepientForm
            onDelete={handleDeleteRecipient}
            key={`${el.name}${index}`}
            signer={el}
            index={index}
            isShowError={isShowError}
            onAddRecepient={handleAddRecipients}
          />
        ))}
      </ValidatorWrapper>

      <div className={styles.buttonsContainer}>
        <Button onClick={handleAddOneRecipient} theme={'secondary'} className={styles.button}>
          <ButtonIcon>
            <IconUser />
          </ButtonIcon>
          Add recepient
        </Button>

        <Button onClick={handleCheckRecipients} theme={'primary'} className={styles.button}>
          Review and send
          <ButtonIcon>
            <IconArrowRightLong />
          </ButtonIcon>
        </Button>
      </div>
    </>
  )
}
