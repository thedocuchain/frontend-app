import React from 'react'
import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { ContractTemplate } from 'src/configs/templates'
import { Text } from 'src/components/ui/typography'
import { CategoryBadge } from 'src/pages/templates/components/category-badge'

import styles from './styles.module.css'

export function TemplateCard({ template }: { template: ContractTemplate }) {
  const router = useRouter()

  const handleClick = useEvent(() => {
    void router.push(`/templates/${template.id}`)
  })

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.preview}>
        <span className={styles.previewTitle} />
        <span className={styles.previewLine} />
        <span className={styles.previewLineShort} />
      </div>
      <Text theme='headline-3' className={styles.name}>
        {template.name}
      </Text>
      <div className={styles.meta}>
        <CategoryBadge category={template.category} />
        <Text theme='body-3' className='color-text-secondary'>
          {template.fields.length} fields
        </Text>
      </div>
    </div>
  )
}
