import React, { useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { wait } from '@coxy/utils'

import { Text } from 'src/components/ui/typography'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconArrowRightLong } from 'src/icons'
import { Column, RowCenter } from 'src/components/ui/grid'
import { Space } from 'src/components/ui/space'
import { CheckboxSquare } from 'src/components/ui/checkbox-square'
import { AppLink } from 'src/components/ui/app-link'
import { GuideLabel } from 'src/components/app/document-view-component/components/step-by-step-guide/components/guide-label'
import { Signature } from 'src/components/app/document-view-component/components/edit-tools'
import { signersData } from 'src/pages/document-status-page/data'
import { Tooltip } from 'src/components/ui/tooltip'
import { indexToColorIndex } from 'src/components/app/avatar'
import { useIsMobile } from 'src/utils/use/use-is-mobile'

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
}

export function StepByStepBlock(props: ComponentProps) {
  const { title, isCheckBoxTermsAndPrivacy, isCheckBoxConsents, isSignatureMobileBlock, buttonText } = props.item
  const { stepsLength, activeStep, index, setActiveStep, isOpen } = props
  const isVisible = activeStep === index
  const [isDeleted, setDeleted] = useState(false)
  const isMobile = useIsMobile()

  const [checkBoxTermsPolicy, setCheckBoxTermsPolicy] = useState(false)
  const [checkBoxAds, setCheckBoxAds] = useState(true)
  const [checkBoxConsents, setCheckBoxConsents] = useState(false)

  const handleNextStep = useEvent(async () => {
    if (isSignatureMobileBlock && isMobile && !isSigned) {
      setError(true)
      return
    }

    if (isCheckBoxTermsAndPrivacy && !checkBoxTermsPolicy) {
      return
    }

    if (isCheckBoxConsents && !checkBoxConsents) {
      return
    }

    if (activeStep + 1 === stepsLength) {
      setDeleted(true)
      await wait(200)
      return
    }

    setActiveStep(activeStep + 1)
  })

  const handleSigned = useEvent(async () => {
    if (isSignatureMobileBlock && isMobile && !isSigned) {
      setError(false)
    }
    setSigned(true)
  })

  const recipient = signersData[0]
  const [isSigned, setSigned] = useState(false)
  const [isError, setError] = useState(false)
  const indexRecipient = indexToColorIndex(10)

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
            <Space size={16} />

            <Tooltip isError={isError} isShow={isError} content={'Signature is required.'}>
              <Signature
                setSigned={handleSigned}
                isSigned={isSigned}
                isEdited={true}
                index={indexRecipient}
                name={recipient.name}
              />
            </Tooltip>
          </div>
        )}

        {isCheckBoxConsents && (
          <>
            <Space size={16} />

            <Column className='gap12'>
              <CheckboxSquare checked={checkBoxConsents} onChange={setCheckBoxConsents}>
                I read the{' '}
                <AppLink target={'_blank'} href={'/'}>
                  Electronic Records
                </AppLink>{' '}
                and{' '}
                <AppLink target={'_blank'} href={'/'}>
                  Signature Dislosure
                </AppLink>{' '}
                and agree to use electronic record and signatures.
              </CheckboxSquare>
              <GuideLabel title={'Accept'} />
            </Column>
          </>
        )}

        {isCheckBoxTermsAndPrivacy && (
          <>
            <Space size={16} />

            <Column className='gap12'>
              <CheckboxSquare checked={checkBoxTermsPolicy} onChange={setCheckBoxTermsPolicy}>
                I agree with the{' '}
                <AppLink target={'_blank'} href={'/terms'}>
                  Terms of use
                </AppLink>{' '}
                and{' '}
                <AppLink target={'_blank'} href={'/policy'}>
                  Privacy Policy.
                </AppLink>
              </CheckboxSquare>

              <GuideLabel title={'Accept'} />

              <CheckboxSquare checked={checkBoxAds} onChange={setCheckBoxAds}>
                First to hear DocuChain&apos;s new features.
              </CheckboxSquare>
            </Column>
          </>
        )}
      </div>

      <RowCenter className={styles.buttonNext}>
        <Text theme={'body-3'} className='color-text-secondary'>
          {activeStep + 1} of {stepsLength}
        </Text>
        <Space horizontal size={24} />

        <Button onClick={handleNextStep}>
          {buttonText}
          <ButtonIcon>
            <IconArrowRightLong />
          </ButtonIcon>
        </Button>
      </RowCenter>
    </div>
  )
}
