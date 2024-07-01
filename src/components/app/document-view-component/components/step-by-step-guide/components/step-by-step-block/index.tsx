import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { wait } from '@coxy/utils'
import { useRouter } from 'next/router'

import { Text } from 'src/components/ui/typography'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconArrowRightLong } from 'src/icons'
import { Column, RowCenter } from 'src/components/ui/grid'
import { Space } from 'src/components/ui/space'
import { CheckboxSquare } from 'src/components/ui/checkbox-square'
import { AppLink } from 'src/components/ui/app-link'
import { GuideLabel } from 'src/components/app/document-view-component/components/step-by-step-guide/components/guide-label'
import { Signature } from 'src/components/app/document-view-component/components/edit-tools'
import { Tooltip } from 'src/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import {
  selectedIsSigned,
  selectedIsSignError,
  selectSettingState,
  setSignatureError,
} from 'src/store/reducers/signature'
import { useApi } from 'src/utils/use/use-api'
import { signDocument } from 'src/store/reducers/document/actions/sign-document'
import { sendDocumentNotify } from 'src/store/reducers/document/actions/send-document'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

import styles from './styles.module.css'

export type StepByStepBlockType = {
  title: string
  isCheckBoxTermsAndPrivacy?: boolean
  isCheckBoxConsents?: boolean
  isSignatureMobileBlock?: boolean
  buttonText: string
}

export type ComponentProps = {
  item: StepByStepBlockType
  stepsLength: number
  activeStep: number
  setActiveStep: (number) => void
  index: number
  isOpen: boolean
  setSuccessPage: () => void
  checkBoxFirstToHear: boolean
  setCheckBoxFirstToHear: (boolean) => void
}

export function StepByStepBlock(props: ComponentProps) {
  const { title, isCheckBoxTermsAndPrivacy, isCheckBoxConsents, isSignatureMobileBlock, buttonText } = props.item
  const {
    stepsLength,
    activeStep,
    index,
    setActiveStep,
    isOpen,
    setSuccessPage,
    checkBoxFirstToHear,
    setCheckBoxFirstToHear,
  } = props
  const isVisible = activeStep === index
  const isLastStep = activeStep + 1 === stepsLength
  const [isDeleted, setDeleted] = useState(false)
  const documentData = useAppSelector(selectedDocument)
  const signatureData = useAppSelector(selectSettingState)
  const isSigned = useAppSelector(selectedIsSigned)
  const dispatch = useAppDispatch()
  const [sentToSign, { isSuccess, isLoading }] = useApi(signDocument)
  const [sendDocNotify, sendDocNotifyStatus] = useApi(sendDocumentNotify)

  const [checkBoxTermsPolicyCreatingDoc, setCheckBoxTermsPolicyCreatingDoc] = useState(false)
  const [checkBoxConsentsESDTermsPolicy, setCheckBoxConsentsESDTermsPolicy] = useState(false)
  const [checkBoxError, setCheckBoxError] = useState(false)

  const router = useRouter()
  const isSignPage = router.pathname.includes('sign')
  const signerId = router.query.userId as string

  useEffect(() => {
    // if you need to scroll to signature
    if (isLastStep && isSignPage) {
      const element = document.getElementById('target-id')
      element?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' })
    }

    if (activeStep === 1) {
      const container = document.getElementById('participant-wrapper')
      container?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' })
    }
  }, [activeStep])

  const handleFinish = useEvent(async () => {
    setDeleted(true)
    await wait(200)
    setSuccessPage()
  })

  const handleNextStep = useEvent(async () => {
    if (isLastStep && !isSigned && isSignPage) {
      dispatch(setSignatureError(true))
      return
    }

    if (isCheckBoxTermsAndPrivacy && !checkBoxTermsPolicyCreatingDoc) {
      setCheckBoxError(true)
      return
    }

    if (isCheckBoxConsents && !checkBoxConsentsESDTermsPolicy) {
      setCheckBoxError(true)
      return
    }

    if (isLastStep) {
      if (isSignPage) {
        await sentToSign({
          documentId: documentData.id,
          userId: signerId,
          readRecordsDislosureAndTerms: true,
          firstToHear: checkBoxFirstToHear,
          signFont: signatureData.signatureFont,
          fontSize: signatureData.fontSize,
          signDate: signatureData.signDate,
        })
        return
      }
      await sendDocNotify({ documentId: documentData.id })
      await dispatch(
        getDocument({
          id: documentData.id,
        }),
      )
      return
    }

    setActiveStep(activeStep + 1)
  })

  useEffect(() => {
    if (isSuccess && isSignPage) {
      void handleFinish()
    }

    if (sendDocNotifyStatus.isSuccess && !isSignPage) {
      void handleFinish()
    }
  }, [isSuccess, sendDocNotifyStatus.isSuccess])

  const documentSelected = useAppSelector(selectedDocument)
  const activeSigner = signerId && documentSelected.users.find((user) => user.id === signerId)
  const isSignError = useAppSelector(selectedIsSignError)
  const style = null

  return (
    <div
      className={cn(styles.stepBlock, {
        [styles.isVisible]: isVisible,
        [styles.slideOut]: isDeleted,
        [styles.containerIfOpen]: isOpen,
      })}
    >
      <div>
        <Text theme={'headline-3'}>{title}</Text>

        {isSignatureMobileBlock && (
          <div className={styles.signatureWrapper}>
            <Space size={28} />

            <Tooltip isError={isSignError} isShow={isSignError} content={'Signature is required.'}>
              <Signature isActiveSignature={true} style={style} name={activeSigner?.name} />
            </Tooltip>
          </div>
        )}

        {isCheckBoxConsents && (
          <>
            <Space size={16} />

            <Column className='gap12'>
              <CheckboxSquare
                isVisibleError={checkBoxError && !checkBoxConsentsESDTermsPolicy}
                checked={checkBoxConsentsESDTermsPolicy}
                onChange={setCheckBoxConsentsESDTermsPolicy}
              >
                I read and agree with the{' '}
                <AppLink target={'_blank'} href={'https://docuchain.io/terms'}>
                  Terms of use,
                </AppLink>{' '}
                <span className={'show-mobile'}>
                  <br />
                </span>
                <AppLink target={'_blank'} href={'https://docuchain.io/esign'}>
                  Electronic Signature Disclosure
                </AppLink>{' '}
                and{' '}
                <AppLink target={'_blank'} href={'https://docuchain.io/privacy'}>
                  Privacy Policy.
                </AppLink>
              </CheckboxSquare>

              <GuideLabel title={'Accept'} />

              <CheckboxSquare checked={checkBoxFirstToHear} onChange={setCheckBoxFirstToHear}>
                First to hear DocuChain&apos;s new features.
              </CheckboxSquare>
            </Column>
          </>
        )}

        {isCheckBoxTermsAndPrivacy && (
          <>
            <Space size={16} />

            <Column className='gap12'>
              <CheckboxSquare
                isVisibleError={checkBoxError && !checkBoxTermsPolicyCreatingDoc}
                checked={checkBoxTermsPolicyCreatingDoc}
                onChange={setCheckBoxTermsPolicyCreatingDoc}
              >
                I agree with the{' '}
                <AppLink target={'_blank'} href={'https://docuchain.io/terms'}>
                  Terms of use
                </AppLink>{' '}
                and{' '}
                <AppLink target={'_blank'} href={'https://docuchain.io/privacy'}>
                  Privacy Policy.
                </AppLink>
              </CheckboxSquare>

              <GuideLabel title={'Accept'} />
            </Column>
          </>
        )}
      </div>

      <RowCenter className={styles.buttonNext}>
        <Text theme={'body-3'} className='color-text-secondary'>
          {activeStep + 1} of {stepsLength}
        </Text>
        <Space horizontal size={24} />

        <Button
          className={buttonText === 'Send for signing' ? styles.buttonSend : styles.buttonFinish}
          isLoading={isLoading || sendDocNotifyStatus.isLoading}
          onClick={handleNextStep}
        >
          {buttonText}
          <ButtonIcon>
            <IconArrowRightLong />
          </ButtonIcon>
        </Button>
      </RowCenter>
    </div>
  )
}
