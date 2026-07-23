import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { getTemplate, TemplateField } from 'src/configs/templates'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { IconEdit } from 'src/icons'
import { PortalHeader } from 'src/pages/templates/components/portal-header'
import { TemplateDoc } from 'src/pages/templates/components/template-doc'

import styles from './styles.module.css'

function groupFields(fields: TemplateField[]): TemplateField[][] {
  const rows: TemplateField[][] = []
  for (const field of fields) {
    const last = rows[rows.length - 1]
    if (field.half && last && last.length === 1 && last[0].half) {
      last.push(field)
    } else {
      rows.push([field])
    }
  }
  return rows
}

export function TemplateFillPage() {
  const router = useRouter()
  const template = getTemplate(router.query.id)
  const { title } = usePageHead({ title: `| ${template?.name ?? 'Template'}` })

  const [values, setValues] = useState<Record<string, string>>({})

  const handleBack = useEvent(() => {
    void router.push(template ? `/templates/${template.id}` : '/templates')
  })

  const handleChange = (key: string) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSign = useEvent(() => {
    if (!template) return
    sessionStorage.setItem('docuchain-template-draft', JSON.stringify({ templateId: template.id, values }))
    void router.push('/login')
  })

  if (!template) {
    return (
      <>
        <PageHead>{title}</PageHead>
        <PageWrapper className={styles.page}>
          <PortalHeader />
          <div className={styles.notFound}>
            <Text theme='headline-1' header='h1'>
              Template not found
            </Text>
            <Space size={12} />
            <Text theme='body-2' className='color-text-secondary'>
              This template doesn&apos;t exist or was removed.
            </Text>
            <Space size={20} />
            <Button theme='secondary' onClick={handleBack}>
              Back to templates
            </Button>
          </div>
        </PageWrapper>
      </>
    )
  }

  return (
    <>
      <PageHead>{title}</PageHead>

      <PageWrapper className={styles.page}>
        <PortalHeader />

        <div className={styles.content}>
          <span className={styles.back} onClick={handleBack}>
            <Text theme='body-3' className='color-text-secondary'>
              ← {template.name}
            </Text>
          </span>
          <Space size={16} />

          <div className={styles.layout}>
            <div className={styles.previewPanel}>
              <TemplateDoc template={template} values={values} className={styles.doc} />
            </div>

            <div className={styles.form}>
              <Text theme='headline-1' header='h1'>
                Fill in your details
              </Text>
              <Space size={8} />
              <Text theme='body-2' className='color-text-secondary'>
                Your entries drop straight into the highlighted fields.
              </Text>
              <Space size={24} />

              {groupFields(template.fields).map((row) => (
                <div key={row[0].key} className={styles.fieldRow}>
                  {row.map((field) => (
                    <Input
                      key={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      value={values[field.key] ?? ''}
                      onChange={handleChange(field.key)}
                    />
                  ))}
                </div>
              ))}

              <Space size={24} />
              <Button theme='gradient' onClick={handleSign} className={styles.action}>
                <ButtonIcon stroke>
                  <IconEdit />
                </ButtonIcon>
                Sign with DocuChain
              </Button>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
