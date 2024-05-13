import { ValidatorRule } from '@coxy/react-validator'
import { trim } from '@coxy/utils'

import { useI18N } from 'src/utils/use-i18n'
import { preformatFloat } from 'src/utils/numbers'

import locales from './index.i18n.json'

const emailReg =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const userNameReg = /[A-Za-zа-яА-Я0-9_-]+/

export const useValidatorRules = () => {
  const { t } = useI18N(locales)

  const rules = {
    password: [
      {
        rule: (password: string) => !!password,
        message: t('password-is-empty'),
      },
      {
        rule: (value) => value.length > 5,
        message: t('password-invalid'),
      },
    ],
    repeatPassword: [
      {
        rule: (password: string) => !!password,
        message: t('repeat-password-is-empty'),
      },
      {
        rule: (value) => value.length > 5,
        message: t('repeat-password-invalid'),
      },
    ],
    passwordMatch: [
      {
        rule: (isMatch) => !!isMatch,
        message: t('repeat-password-is-not-match'),
      },
    ],
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
    username: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('username-required'),
      },
      {
        rule: (value) => value.length >= 5,
        message: t('username-short'),
      },
      {
        rule: (value) => userNameReg.test(trim(String(value).toLowerCase())),
        message: t('username-invalid'),
      },
    ],
    description: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('description-required'),
      },
    ],
    documentName: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('document-required'),
      },
    ],
    surname: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('surname-required'),
      },
    ],
    companyName: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('company-required'),
      },
    ],
    country: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('country-required'),
      },
    ],
    legalRequired: [
      {
        rule: (value) => !!value,
        message: t('legal-required'),
      },
    ],
    network: [
      {
        rule: (value) => !!value,
        message: t('network-required'),
      },
    ],
    address: [
      {
        rule: (value) => !!String(value).trim() && !!value,
        message: t('address-required'),
      },
    ],
    chain: [
      {
        rule: (value) => !!String(value).trim() && !!value,
        message: t('chain-required'),
      },
    ],
    accountName: [
      {
        rule: (value) => !!value,
        message: t('account-name-required'),
      },
    ],
    bankProvider: [
      {
        rule: (value) => !!value,
        message: t('bank-provider-required'),
      },
    ],
    amount: [
      {
        rule: (value) => !!value,
        message: t('amount-required'),
      },
      {
        rule: (value) => !Number.isNaN(Number(value)),
        message: t('amount-is-need-number'),
      },
    ],
    fee: [
      {
        rule: (value) => !Number.isNaN(Number(value)),
        message: t('fee-is-need-number'),
      },
    ],
    currentBalance: [
      {
        rule: (value) => !!value,
        message: t('current-balance-required'),
      },
      {
        rule: (value) => parseFloat(preformatFloat(value)) >= 0,
        message: t('current-balance-is-number'),
      },
    ],
    categoryTitle: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('category-name-is-required'),
      },
    ],
    categoryParent: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('subcategory-is-required'),
      },
    ],
    automationName: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('automation-name-is-required'),
      },
    ],
    txDirections: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('transaction-direction-is-required'),
      },
    ],
    txCategory: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('transaction-category-is-required'),
      },
    ],
    automationCategory: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0,
        message: t('category-is-required'),
      },
    ],
    categoryCode: [
      {
        rule: (value) => !!value && value !== '' && value.length !== 0 && !Number.isNaN(Number(value)),
        message: t('category-code-is-required-a-number'),
      },
    ],
    accounts: [
      {
        rule: (value) => value.length !== 0,
        message: t('please-select-at-least-one-account'),
      },
    ],
    contactName: [
      {
        rule: (value) => !!value && value !== '',
        message: t('please-enter-person-or-company-name'),
      },
    ],
  }

  return rules as Record<keyof typeof rules, ValidatorRule[]>
}
