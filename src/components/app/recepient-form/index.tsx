import React, { useState } from 'react'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Recipient } from 'src/store/reducers/document/types'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { Input } from 'src/components/ui/input'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { Text } from 'src/components/ui/typography'
import { colorsBorders, indexToColorIndex } from 'src/components/app/avatar'
import { Dropdown } from 'src/components/ui/dropdown'
import { DropdownItem } from 'src/components/ui/dropdown/components/dropdown-item'
import { IconClose } from 'src/icons'
import { RowBetweenCenter } from 'src/components/ui/grid'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

export function RecepientForm(props: {
  signer: Recipient
  index: number
  isShowError: boolean
  onDelete: (index: number) => void
  onAddRecepient: (form: Recipient, index: number) => void
}) {
  const { signer, index, isShowError, onDelete, onAddRecepient } = props
  const rules = useValidatorRules()

  const [form, setValue] = useStateForm({
    name: signer.name,
    email: signer.email,
  })

  const roles: { title: 'signer' | 'watcher'; description: string }[] = [
    { title: 'signer', description: 'Reviews and signs the document.' },
    { title: 'watcher', description: 'Tracks document status, does not sign.' },
  ]

  const [selectedRole, setSelectedRole] = useState<{ title: 'signer' | 'watcher'; description: string }>({
    title: signer.role,
    description: 'Reviews and signs the document.',
  })

  const handleChange = useEvent(() => {
    if (form.email || form.name) {
      onAddRecepient(
        {
          name: form.name,
          email: form.email,
          role: selectedRole.title,
        },
        index,
      )
    }
  })

  const handleChangeRole = useEvent((item: { title: 'signer' | 'watcher'; description: string }) => {
    setSelectedRole(item)
    if (item.title !== signer.role) {
      onAddRecepient(
        {
          name: form.name,
          email: form.email,
          role: item.title,
        },
        index,
      )
    }
  })

  const indexColor = indexToColorIndex(props.index)
  const color = colorsBorders[indexColor]

  return (
    <div className={styles.blockWrapper}>
      <RowBetweenCenter>
        <Text theme={'label-2'} className='color-text-secondary'>
          Recepient {index + 1}
        </Text>

        <Button onClick={() => onDelete(index)} theme={'link-secondary'} className={'show-mobile'}>
          Delete
        </Button>
      </RowBetweenCenter>
      <div className={styles.block}>
        <IconClose onClick={() => onDelete(index)} className={cn(styles.iconClose, 'on-click')} />
        <div className={styles.leftColorPanel} style={{ background: color }} />
        <InputValidatorField
          required={selectedRole.title === 'signer'}
          rules={rules.name}
          value={form.name}
          isVisibleErrors={isShowError}
        >
          <Input
            onBlur={handleChange}
            label='Name for signature'
            placeholder='John Doe'
            value={form.name}
            onChange={setValue('name')}
          />
        </InputValidatorField>

        <InputValidatorField required rules={rules.email} value={form.email} isVisibleErrors={isShowError}>
          <Input
            onBlur={handleChange}
            label='Email'
            isEmail
            placeholder='john.doe@gmail.com'
            value={form.email}
            onChange={setValue('email')}
          />
        </InputValidatorField>

        <InputValidatorField id={'role'} rules={rules.name} value={selectedRole} isVisibleErrors={isShowError}>
          <Dropdown
            titleMobile={'Role types'}
            label={'Role'}
            value={selectedRole}
            onChange={(item) => handleChangeRole(item)}
            data={roles}
            keyExtractor={(item) => item.title}
            renderItem={(item, props) => (
              <DropdownItem
                renderFrom={props.renderFrom}
                title={item.title}
                description={item.description}
                key={item.title}
                isActive={item.title === selectedRole?.title}
              />
            )}
          />
        </InputValidatorField>
      </div>
    </div>
  )
}
