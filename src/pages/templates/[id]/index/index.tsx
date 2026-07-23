import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { getTemplate } from 'src/configs/templates'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconEdit } from 'src/icons'
import { PortalHeader } from 'src/pages/templates/components/portal-header'
import { CategoryBadge } from 'src/pages/templates/components/category-badge'
import { TemplateDoc } from 'src/pages/templates/components/template-doc'
import { PreviewModal } from './components/preview-modal'

import styles from './styles.module.css'

export function TemplatePage() {
  const router = useRouter()
  const template = getTemplate(router.query.id)
  const { title } = usePageHead({ title: `| ${template?.name ?? 'Template'}` })

  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  const handleBack = useEvent(() => {
    void router.push('/templates')
  })

  const handleUse = useEvent(() => {
    if (template) void router.push(`/templates/${template.id}/fill`)
  })

  const handleOpenPreview = useEvent(() => setIsPreviewVisible(true))
  const handleClosePreview = useEvent(() => setIsPreviewVisible(false))

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
              ← Back to templates
            </Text>
          </span>
          <Space size={16} />

          <div className={styles.layout}>
            <div className={styles.previewPanel}>
              <TemplateDoc template={template} className={styles.doc} />
            </div>

            <div className={styles.info}>
              <CategoryBadge category={template.category} />
              <Space size={12} />
              <Text theme='headline-1' header='h1'>
                {template.name}
              </Text>
              <Space size={12} />
              <Text theme='body-2' className='color-text-secondary'>
                {template.description}
              </Text>
              <Space size={24} />
              <Button theme='gradient' onClick={handleUse} className={styles.action}>
                <ButtonIcon stroke>
                  <IconEdit />
                </ButtonIcon>
                Use this template &amp; sign
              </Button>
              <Space size={12} />
              <Button theme='secondary' onClick={handleOpenPreview} className={styles.action}>
                Preview full document
              </Button>
            </div>
          </div>
        </div>

        <PreviewModal template={template} visible={isPreviewVisible} onClose={handleClosePreview} onUse={handleUse} />
      </PageWrapper>
    </>
  )
}
