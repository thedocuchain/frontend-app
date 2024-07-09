import { ValidatorRule } from '@coxy/react-validator'
import { trim } from '@coxy/utils'

import { useI18N } from 'src/utils/use-i18n'

import locales from './index.i18n.json'

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
const userNameReg = /^[A-Za-z0-9 ]*$/
const messageReg = /^[-()? /.",_#№:;+'*<>&\s0-9a-zA-Zа-яА-Я]*$/
const docReg = /^[-()? /.",_#№:;+'*<>&А-Яа-яA-Za-z0-9]*$/

export const useValidatorRules = () => {
  const { t } = useI18N(locales)

  const rules = {
    email: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('field-required'),
      },
      {
        rule: (value) => emailReg.test(trim(String(value).toLowerCase())),
        message: t('email-invalid'),
      },
    ],
    name: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('field-required'),
      },
      {
        rule: (value) => userNameReg.test(trim(String(value).toLowerCase())),
        message: t('name-invalid'),
      },
    ],
    role: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('field-required'),
      },
    ],
    message: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('field-required'),
      },
      {
        rule: (value) => messageReg.test(trim(String(value))),
        message: t('invalid-character'),
      },
    ],
    id: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('id-required'),
      },
    ],
    documentName: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('document-required'),
      },
      {
        rule: (value) => docReg.test(trim(String(value).toLowerCase())),
        message: t('invalid-character'),
      },
    ],
  }

  return rules as Record<keyof typeof rules, ValidatorRule[]>
}
