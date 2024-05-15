import { ValidatorRule } from '@coxy/react-validator'
import { trim } from '@coxy/utils'

import { useI18N } from 'src/utils/use-i18n'

import locales from './index.i18n.json'

const emailReg =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const userNameReg = /[A-Za-z0-9_-]+/

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
    ],
  }

  return rules as Record<keyof typeof rules, ValidatorRule[]>
}
