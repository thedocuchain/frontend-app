import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from 'src/components/ui/ui-content/styles.module.css'

export function PageWrapper({ className, ...props }: PropsWithChildren & { className?: string }) {
  return <div {...props} className={cn(styles.pageWrapper, className)} />
}
