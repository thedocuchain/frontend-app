import React from 'react'
import cn from 'classnames'

import { IconDOC, IconDOCX, IconPDF } from 'src/icons'
import { Text } from 'src/components/ui/typography'
import { ProgressBar } from 'src/components/app/progress-bar'
import { Space } from 'src/components/ui/space'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

export function FileUploadProgress(props: { file: File; setFile: (file: File | null) => void }) {
  const { name, size } = props.file
  const isShowError = size / 1048576 > 5
  const isDoc = name.includes('.doc') && !name.includes('.docx')
  const isPdf = name.includes('.pdf')
  const isDocx = name.includes('.docx')
  const sizeFile = size / 1024 < 1024 ? size / 1024 : size / 1024 / 1024
  const sizeName = size / 1024 < 1024 ? 'KB' : 'MB'

  return (
    <div className={cn(styles.wrapper, { [styles.error]: isShowError })}>
      <div>
        {isPdf && <IconPDF />}
        {isDocx && <IconDOCX />}
        {isDoc && <IconDOC />}
      </div>

      {!isShowError && (
        <div className={styles.column}>
          <Text theme={'headline-4'} className={styles.name}>
            {name}
          </Text>

          <Text theme={'body-3'} className='color-text-secondary'>
            {sizeFile.toString().includes('.') ? sizeFile.toFixed(2) : sizeFile} {sizeName}
          </Text>
          <Space size={8} />

          {/* todo ProgressBar */}
          <ProgressBar value={10} />
        </div>
      )}

      {isShowError && (
        <div className={styles.row}>
          <div className={styles.column}>
            <Text theme={'headline-4'} className={styles.name}>
              {name}
            </Text>

            <Text theme={'body-3'} className='color-text-secondary hide-mobile'>
              The file is too large. Try another document or compress this one.
            </Text>
            <Text theme={'body-3'} className='color-text-secondary show-mobile'>
              The file’s too large! Upload a smaller version or try another file.
            </Text>
          </div>

          <Button size='sm' onClick={() => props.setFile(null)} className={styles.button}>
            New upload
          </Button>
        </div>
      )}
    </div>
  )
}
