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

export function Header(props: { isDocumentPreview?: boolean; isSteps?: boolean; title?: string }) {
  const { isDocumentPreview, isSteps, title } = props
  const isMobile = useIsMobile()
  const [hasScrolled, setHasScrolled] = useState(false)
  const isSearch = true

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

          {isSearch ? (
            <Button theme='secondary' size='sm'>
              <ButtonIcon>
                <IconSearch />
              </ButtonIcon>
              Check status
            </Button>
          ) : (
            <Button theme='secondary' size='sm'>
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
