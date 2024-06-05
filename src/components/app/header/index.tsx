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
import { StepsDocumentPage, StepWizardType } from 'src/pages/doc/[id]/index'

import styles from './styles.module.css'

type HeaderProps = {
  isTransparent?: boolean
  isDocumentPreview?: boolean
  isStepsWizard?: boolean
  stepsWizard?: StepWizardType[]
  activeStepWizard?: StepsDocumentPage
  title?: string
}

export function Header(props: HeaderProps) {
  const { isTransparent, isDocumentPreview, isStepsWizard, stepsWizard, activeStepWizard, title } = props
  const isMobile = useIsMobile()
  const [hasScrolled, setHasScrolled] = useState(false)
  const router = useRouter()

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

  const handleNewDocument = useEvent(async () => {
    void router.push('https://www.docuchain.io/')
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

          <Button theme='secondary' size='sm' onClick={handleNewDocument}>
            <ButtonIcon>
              <IconPlusBlack />
            </ButtonIcon>
            {isMobile ? 'Document' : 'New document'}
          </Button>
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
