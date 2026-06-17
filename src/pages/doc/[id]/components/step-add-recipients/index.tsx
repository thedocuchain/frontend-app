import React, { useContext, useEffect, useMemo } from 'react'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { trim, uniqBy } from '@coxy/utils'

import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { ToastContext } from 'src/components/common/toast/context'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { Text } from 'src/components/ui/typography'
import { Textarea } from 'src/components/ui/textarea'
import { Space } from 'src/components/ui/space'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconArrowRightLong, IconUser } from 'src/icons'
import { Chains, User, UserInfo } from 'src/store/reducers/document/types'
import { RecepientForm } from 'src/components/app/recepient-form'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { StepsDocumentPage } from 'src/pages/doc/[id]/index'
import { useApi } from 'src/utils/use/use-api'
import { addUsersToDocument } from 'src/store/reducers/document/actions/add-users-to-document'

import styles from './styles.module.css'
import { Dropdown } from 'src/components/ui/dropdown'
import { DropdownItem } from 'src/components/ui/dropdown/components/dropdown-item'

type ComponentProps = {
  signers: UserInfo[]
  setSigners: (signers: UserInfo[]) => void
  setActiveStep: (step: StepsDocumentPage) => void
}

const chains = [
  {
    title: 'Polygon',
    value: Chains.POLYGON,
  },
  {
    title: 'Solana',
    value: Chains.SOLANA,
  },
  {
    title: 'BNB',
    value: Chains.BSC,
  },
  {
    title: 'Base',
    value: Chains.BASE,
  },
]

export function StepAddRecipients(props: ComponentProps) {
  const { signers, setSigners, setActiveStep } = props
  const rules = useValidatorRules()
  const toast = useContext(ToastContext)
  const [addUsers, { isSuccess, isLoading }] = useApi(addUsersToDocument)
  const document = useAppSelector(selectedDocument)
  const documentShortId = document?.shortId
  const documentName = document.name

  const [form, setValue] = useStateForm({
    documentName,
    chain: Chains.POLYGON,
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

  const handleAddRecipients = useEvent((form: User, indexFind: number) => {
    setSigners(signers.map((el, index) => (index === indexFind ? form : el)))
  })

  const handleDeleteRecipient = useEvent((indexDelete: number) => {
    if (signers.length === 1) return
    setSigners(signers.filter((el, index) => index !== indexDelete))
  })

  const saveToLocalStorage = useEvent((key: string, value: string) => {
    const stored = localStorage.getItem(key)
    let items: string[] = []
    if (stored) {
      try {
        items = JSON.parse(stored)
      } catch {
        items = []
      }
    }
    if (!items.includes(value)) {
      items.unshift(value)
      localStorage.setItem(key, JSON.stringify(items))
    }
  })

  const handleCheckRecipients = useEvent(async () => {
    setIsShowError(false)
    const { isValid, message, errors } = validate()
    const uniqueErrors = errors ? uniqBy(errors, (item) => item.message) : []

    if (validator.current) {
      validator.current.clearCustomErrors()
    }

    if (signers.length < 2) {
      toast.addToast({
        text: 'Add at least one recipient',
      })
      return
    }

    if (!isValid || isNoSigners) {
      setIsShowError(true)

      if (uniqueErrors?.length === 1 && !isNoSigners) {
        toast.addToast({
          text: message,
        })
      }

      if (isNoSigners) {
        setIsShowError(true)
        await validator.current.setCustomError({
          id: 'role',
          message: 'Select at least 1 signer',
          isValid: false,
        })

        if (!errors?.length) {
          toast.addToast({
            text: 'Select at least 1 signer',
          })
        }
      }

      if ((isNoSigners && uniqueErrors?.length >= 1) || uniqueErrors?.length > 1) {
        toast.addToast({
          text: 'Check all fields are correct',
        })
      }

      return
    }

    signers.forEach((signer) => {
      if (signer.name && signer.email) {
        saveToLocalStorage('usedNames', signer.name)
        saveToLocalStorage('usedEmails', signer.email)
      }
    })

    await addUsers({
      id: document.id,
      name: trim(form.documentName),
      users: signers,
      blockchain: form.chain,
    })
  })

  useEffect(() => {
    if (isSuccess) {
      setActiveStep('verify-initiator')
    }
  }, [isSuccess])

  useEffect(() => {
    setIsShowError(false)
  }, [form, isNoSigners])

  return (
    <>
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
            documentShortId={documentShortId}
            label={'Document name'}
            placeholder='Enter document name'
            value={form.documentName}
            onChange={setValue('documentName')}
          />
        </InputValidatorField>
        <Space size={12} />

        <InputValidatorField
          id={'role'}
          rules={rules.role}
          value={form.chain}
          isVisibleErrors={isShowError}
          className={styles.formWrapper}
        >
          <Dropdown
            titleMobile={'Blockchain'}
            label={'Blockchain'}
            value={chains.find((item) => item.value === form.chain)}
            onChange={(item) => setValue('chain')(item.value)}
            data={chains}
            keyExtractor={(item) => item.value}
            renderItem={(item, props) => (
              <DropdownItem
                renderFrom={props.renderFrom}
                title={item.title}
                key={item.value}
                isActive={item.value === form.chain}
                capitalize
              />
            )}
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
            setIsShowError={setIsShowError}
            onAddRecepient={handleAddRecipients}
            signers={signers}
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

        <Button isLoading={isLoading} onClick={handleCheckRecipients} theme={'primary'} className={styles.button}>
          Review and send
          <ButtonIcon>
            <IconArrowRightLong />
          </ButtonIcon>
        </Button>
      </div>
    </>
  )
}
