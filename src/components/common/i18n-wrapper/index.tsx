import React, { PropsWithChildren } from 'react'
import { I18nProvider } from '@coxy/i18n'

import { useAppSelector } from 'src/store/hooks'
import { selectedDefaultLanguage, selectedLanguage } from 'src/store/reducers/settings'

export function I18nWrapper(props: PropsWithChildren) {
  const lang = useAppSelector(selectedLanguage)
  const defaultLang = useAppSelector(selectedDefaultLanguage)

  return (
    <I18nProvider fallback={defaultLang.code} language={lang?.code || defaultLang.code}>
      {props.children}
    </I18nProvider>
  )
}
