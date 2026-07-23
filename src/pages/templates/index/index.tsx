import React, { useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { contractTemplates, templateCategories } from 'src/configs/templates'
import { PageHead, usePageHead, PageDescription } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Text } from 'src/components/ui/typography'
import { Input } from 'src/components/ui/input'
import { Space } from 'src/components/ui/space'
import { IconSearch } from 'src/icons'
import { PortalHeader } from 'src/pages/templates/components/portal-header'
import { TemplateCard } from './components/template-card'

import styles from './styles.module.css'

export function TemplatesPage() {
  const { title } = usePageHead({ title: '| Contract templates' })
  const router = useRouter()

  const initialQuery = typeof router.query.q === 'string' ? router.query.q : ''
  const [query, setQuery] = useState(initialQuery)
  const [applied, setApplied] = useState(initialQuery)
  const [category, setCategory] = useState('All')

  const handleSearch = useEvent(() => {
    const q = query.trim()
    setApplied(q)
    void router.replace({ pathname: '/templates', query: q ? { q } : {} }, undefined, { shallow: true })
  })

  const handleReset = useEvent(() => {
    setQuery('')
    setApplied('')
    setCategory('All')
    void router.replace({ pathname: '/templates' }, undefined, { shallow: true })
  })

  const templates = contractTemplates.filter((template) => {
    if (applied) {
      const q = applied.toLowerCase()
      return template.name.toLowerCase().includes(q) || template.category.toLowerCase().includes(q)
    }
    return category === 'All' || template.category === category
  })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>
        Ready-made contract templates: fill in your details and sign with DocuChain in minutes.
      </PageDescription>

      <PageWrapper className={styles.page}>
        <PortalHeader />

        <div className={styles.content}>
          <Text theme='display-text' header='h1' className={styles.title}>
            Contract <span className={styles.titleAccent}>templates</span>
          </Text>
          <Space size={8} />
          <Text theme='body-2' className='color-text-secondary'>
            Pick a template, make it yours, and sign it.
          </Text>
          <Space size={24} />

          <div className={styles.searchRow}>
            <Input
              isSearch
              placeholder='Search templates by name…'
              value={query}
              onChange={setQuery}
              onEnter={handleSearch}
            />
            <button type='button' className={styles.searchButton} onClick={handleSearch}>
              <Text theme='button-standard' className={styles.searchButtonLabel}>
                Search
              </Text>
              <IconSearch className={styles.searchButtonIcon} />
            </button>
          </div>
          <Space size={20} />

          {applied ? (
            <Text theme='body-2'>
              {templates.length} {templates.length === 1 ? 'template' : 'templates'} matching{' '}
              <b>&ldquo;{applied}&rdquo;</b>
            </Text>
          ) : (
            <div className={styles.chips}>
              {['All', ...templateCategories].map((item) => (
                <button
                  key={item}
                  type='button'
                  className={cn(styles.chip, { [styles.chipActive]: category === item })}
                  onClick={() => setCategory(item)}
                >
                  <Text theme='label-1' className={styles.chipLabel}>
                    {item}
                  </Text>
                </button>
              ))}
            </div>
          )}
          <Space size={20} />

          <div className={styles.grid}>
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className={styles.footerHint}>
            <Text theme='body-3' className='color-text-secondary'>
              Can&apos;t find it?{' '}
              <span className={styles.inlineLink} onClick={handleReset}>
                Browse the full catalog
              </span>{' '}
              or{' '}
              <a className={styles.inlineLink} href='https://docuchain.io/'>
                start from a blank document
              </a>
              .
            </Text>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
