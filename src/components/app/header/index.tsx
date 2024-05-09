import React from 'react'

import { Logotype } from 'src/components/app/logotype'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconPlusBlack } from 'src/icons'
import { StepsWizard } from 'src/components/app/steps-wizard'
import { Space } from 'src/components/ui/space'

import styles from './styles.module.css'

export function Header() {
  const steps = [
    {
      title: 'Document uploaded',
      isActive: false,
    },
    {
      title: 'Document uploaded',
      isActive: true,
    },
    {
      title: 'Document uploaded',
      isActive: false,
    },
  ]
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Logotype />
          {/* <Button theme='secondary' size='sm'> */}
          {/*  <ButtonIcon> */}
          {/*    <IconSearch /> */}
          {/*  </ButtonIcon> */}
          {/*  Check status */}
          {/* </Button> */}

          <div className='hide-mobile'>
            <StepsWizard steps={steps} />
          </div>

          <Button theme='secondary' size='sm'>
            <ButtonIcon>
              <IconPlusBlack />
            </ButtonIcon>
            {/* New document */}
            Document
          </Button>
        </div>

        <div className='show-mobile'>
          <Space size={10} />
          <StepsWizard steps={steps} />
        </div>
      </header>
    </div>
  )
}
