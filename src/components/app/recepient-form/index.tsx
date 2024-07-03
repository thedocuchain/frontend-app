import React, { useEffect, useState } from 'react'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { ValidatorRule } from '@coxy/react-validator'

import { User, UserInfo } from 'src/store/reducers/document/types'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { Input } from 'src/components/ui/input'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { Text } from 'src/components/ui/typography'
import { colorsBorders, indexToColorIndex } from 'src/components/app/avatar'
import { Dropdown } from 'src/components/ui/dropdown'
import { DropdownItem } from 'src/components/ui/dropdown/components/dropdown-item'
import { IconCloseCircle } from 'src/icons'
import { RowBetweenCenter } from 'src/components/ui/grid'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

export function RecepientForm(props: {
  signer: Partial<User>
  index: number
  isShowError: boolean
  setIsShowError: (boolean) => void
  onDelete: (index: number) => void
  onAddRecepient: (form: Partial<User>, index: number) => void
  signers: UserInfo[]
}) {
  const { signer, index, isShowError, setIsShowError, onDelete, onAddRecepient, signers } = props
  const rules = useValidatorRules()

  const [form, setValue] = useStateForm({
    name: signer.name,
    email: signer.email,
  })

  useEffect(() => {
    setIsShowError(false)
  }, [form])

  const roles = [
    { name: 'signer', description: 'Reviews and signs the document.' },
    { name: 'watcher', description: 'Tracks document status, does not sign.' },
  ]

  const [selectedRole, setSelectedRole] = useState({
    name: signer.role,
    description: 'Reviews and signs the document.',
  })

  const handleChange = useEvent(() => {
    if (form.email || form.name) {
      onAddRecepient(
        {
          name: form.name,
          email: form.email,
          role: selectedRole.name,
        },
        index,
      )
    }
  })

  const handleChangeRole = useEvent((item) => {
    setSelectedRole(item)
    if (item.name !== signer.role) {
      onAddRecepient(
        {
          name: form.name,
          email: form.email,
          role: item.name,
        },
        index,
      )
    }
  })

  const indexColor = indexToColorIndex(props.index)
  const color = colorsBorders[indexColor]

  const uniqueEmailRule: ValidatorRule = {
    rule: (value) =>
      signer.role === 'signer'
        ? signers.filter((el) => el.role === 'signer').filter((el) => el.email === value).length === 1
        : signers.filter((el) => el.role === 'watcher').filter((el) => el.email === value).length === 1,
    message: signer.role === 'signer' ? 'Signers emails must be unique' : 'Watchers emails must be unique',
  }

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
        {signers.length > 1 && (
          <IconCloseCircle onClick={() => onDelete(index)} className={cn(styles.iconClose, 'on-click')} />
        )}
        <div className={styles.leftColorPanel} style={{ background: color }} />
        <InputValidatorField
          id={'name'}
          required={selectedRole.name === 'signer'}
          rules={rules.name}
          value={form.name}
          isVisibleErrors={isShowError}
          className={styles.formWrapper}
        >
          <Input
            onBlur={handleChange}
            label='Name for signature'
            placeholder='John Doe'
            value={form.name}
            onChange={setValue('name')}
          />
        </InputValidatorField>

        <InputValidatorField
          id={'email'}
          required
          rules={[...rules.email, uniqueEmailRule]}
          value={form.email}
          isVisibleErrors={isShowError}
          className={styles.formWrapper}
        >
          <Input
            onBlur={handleChange}
            label='Email'
            isEmail
            placeholder='john.doe@gmail.com'
            value={form.email}
            onChange={setValue('email')}
          />
        </InputValidatorField>

        <InputValidatorField
          id={'role'}
          rules={rules.role}
          value={selectedRole}
          isVisibleErrors={isShowError}
          className={styles.formWrapper}
        >
          <Dropdown
            titleMobile={'Role types'}
            label={'Role'}
            value={selectedRole}
            onChange={(item) => handleChangeRole(item)}
            data={roles}
            keyExtractor={(item) => item.name}
            renderItem={(item, props) => (
              <DropdownItem
                renderFrom={props.renderFrom}
                title={item.name}
                description={item.description}
                key={item.name}
                isActive={item.name === selectedRole?.name}
              />
            )}
          />
        </InputValidatorField>
      </div>
    </div>
  )
}
