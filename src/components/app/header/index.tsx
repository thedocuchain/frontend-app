import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { Logotype } from 'src/components/app/logotype'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconPlusBlack, IconSearch } from 'src/icons'
import { StepsWizard } from 'src/components/app/steps-wizard'
import { Space } from 'src/components/ui/space'
import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

type HeaderProps = {
  step?: 'check-status' | 'new-document'
  setStep?: (step: 'check-status' | 'new-document') => void
  isDocumentPreview?: boolean
  isSteps?: boolean
  title?: string
}

export function Header(props: HeaderProps) {
  const { step, setStep, isDocumentPreview, isSteps, title } = props
  const isMobile = useIsMobile()
  const [hasScrolled, setHasScrolled] = useState(false)
  const isNewDocument = step === 'new-document'

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const shouldBeVisible = offset > 50
      if (shouldBeVisible !== hasScrolled) {
        setHasScrolled(shouldBeVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const steps = [
    {
      title: 'Upload',
      isActive: false,
    },
    {
      title: 'Add recipients',
      isActive: true,
    },
    {
      title: 'Preview and send',
      isActive: false,
    },
  ]

  return (
    <div className={styles.wrapper}>
      <header className={cn(styles.header, { [styles.headerDocumentPreview]: isDocumentPreview })}>
        <div className={styles.container}>
          <Logotype />

          {isDocumentPreview && hasScrolled && (
            <div className={styles.title}>
              <Text theme='headline-1'>{title}</Text>
            </div>
          )}

          {isSteps && (
            <div className='hide-mobile'>
              <StepsWizard steps={steps} />
            </div>
          )}

          {isNewDocument ? (
            <Button theme='secondary' size='sm' onClick={() => setStep('check-status')}>
              <ButtonIcon>
                <IconSearch />
              </ButtonIcon>
              Check status
            </Button>
          ) : (
            <Button theme='secondary' size='sm' onClick={() => setStep('new-document')}>
              <ButtonIcon>
                <IconPlusBlack />
              </ButtonIcon>
              {isMobile ? 'Document' : 'New document'}
            </Button>
          )}
        </div>

        {isSteps && (
          <div className='show-mobile w100-p'>
            <Space size={10} />
            <StepsWizard steps={steps} />
          </div>
        )}
      </header>
    </div>
  )
}
