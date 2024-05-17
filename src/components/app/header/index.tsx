import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { useRouter } from 'next/router'

import { Logotype } from 'src/components/app/logotype'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconPlusBlack } from 'src/icons'
import { StepsWizard } from 'src/components/app/steps-wizard'
import { Space } from 'src/components/ui/space'
import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { Text } from 'src/components/ui/typography'
import { StepsDocumentPage, StepWizardType } from 'src/pages/document/[id]/index.p'

import styles from './styles.module.css'

type HeaderProps = {
  step?: 'check-status' | 'new-document'
  setStep?: (step: 'check-status' | 'new-document') => void
  isTransparent?: boolean
  isDocumentPreview?: boolean
  isStepsWizard?: boolean
  stepsWizard?: StepWizardType[]
  activeStepWizard?: StepsDocumentPage
  title?: string
}

export function Header(props: HeaderProps) {
  const { step, setStep, isTransparent, isDocumentPreview, isStepsWizard, stepsWizard, activeStepWizard, title } = props
  const isMobile = useIsMobile()
  const [hasScrolled, setHasScrolled] = useState(false)
  const isNewDocument = step === 'new-document'
  const router = useRouter()
  const queryCheckId = router.query.searchId as string

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const shouldBeVisible = offset > 100
      const shouldBeNotVisible = offset < 100

      if (shouldBeVisible !== hasScrolled) {
        setHasScrolled(shouldBeVisible)
      }
      if (shouldBeNotVisible) {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (queryCheckId) {
      setStep('check-status')
    }
  }, [])

  const handleSetStep = useEvent(async () => {
    if (router.pathname !== '/') {
      void router.push('/')
      return
    }
    if (step === 'new-document') {
      setStep('check-status')
      return
    }
    setStep('new-document')
  })

  return (
    <div className={cn(styles.wrapper, { [styles.transparent]: isTransparent })}>
      <header
        className={cn(styles.header, {
          [styles.headerDocumentPreview]: isDocumentPreview,
          [styles.headerSteps]: isStepsWizard,
        })}
      >
        <div className={styles.container}>
          <Logotype />

          {isDocumentPreview && hasScrolled && (
            <div className={styles.title}>
              <Text theme='headline-1'>{title}</Text>
            </div>
          )}

          {isStepsWizard && stepsWizard && (
            <div className='hide-tablet'>
              <StepsWizard steps={stepsWizard} activeStep={activeStepWizard} />
            </div>
          )}

          {isNewDocument ? (
            <Button theme='secondary' size='sm' onClick={handleSetStep}>
              Check status
            </Button>
          ) : (
            <Button theme='secondary' size='sm' onClick={handleSetStep}>
              <ButtonIcon>
                <IconPlusBlack />
              </ButtonIcon>
              {isMobile ? 'Document' : 'New document'}
            </Button>
          )}
        </div>

        {isStepsWizard && stepsWizard && (
          <div className='show-mobile w100-p'>
            <Space size={10} />
            <StepsWizard steps={stepsWizard} activeStep={activeStepWizard} />
          </div>
        )}
      </header>
    </div>
  )
}
