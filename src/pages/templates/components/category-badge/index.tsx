import React from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

const categoryStyles: Record<string, string> = {
  NDA: styles.nda,
  Employment: styles.employment,
  Sales: styles.sales,
  Lease: styles.lease,
  Services: styles.services,
  Freelance: styles.freelance,
}

export function CategoryBadge(props: { category: string; className?: string }) {
  const { category, className } = props

  return (
    <div className={cn(styles.badge, categoryStyles[category], className)}>
      <Text theme='label-3' className={styles.text}>
        {category}
      </Text>
    </div>
  )
}
