import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { Column } from 'src/components/ui/grid'
import { UploadCardBg } from 'src/components/app/upload-card-bg'
import { Text } from 'src/components/ui/typography'
import { IconPlus, IconUpload } from 'src/icons'
import { Space } from 'src/components/ui/space'
import { Button } from 'src/components/ui/button'
import { FileUploadProgress } from 'src/components/app/file-upload-progress'

import styles from './styles.module.css'

export function StepNewDocument(): JSX.Element {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = React.useRef(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const onButtonClick = () => {
    inputRef.current.click()
  }

  useEffect(() => {
    ;(async () => {
      if (file) {
        // todo ProgressBar
        // console.log(file, 'file')
      }
    })()
  }, [file])

  return (
    <>
      {dragActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(styles.wrapperFile, { [styles.wrapperFileDisplay]: dragActive })}
        >
          <div className={styles.plus}>
            <IconPlus />
          </div>
          <Space size={32} />
          <Text theme={'display-text'}>Drop your files here!</Text>
        </div>
      )}

      <form name='formElem' onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} className='w100-p'>
        <label htmlFor='file' className='w100-p h100-p column-center'>
          <Text theme={'display-text'}>Sign your document</Text>
          <div className='hide-mobile'>
            <Space size={16} />
          </div>
          <div className='show-mobile-mobile'>
            <Space size={4} />
          </div>
          <Text theme={'body-1'}>Add a file you need to sign.</Text>
          <div className='hide-mobile'>
            <Space size={44} />
          </div>

          <div className='show-mobile-mobile'>
            <Space size={32} />
          </div>

          {file && <FileUploadProgress file={file} setFile={setFile} />}

          {!file && (
            <UploadCardBg>
              <Column className='column-center text-center w100-p'>
                <IconUpload />
                <Space size={12} />
                <Text theme={'body-1'} className='hide-mobile'>
                  Drag and drop or click to upload
                </Text>
                <Text theme={'body-1'} className='show-mobile'>
                  Click to upload
                </Text>
                <Space size={6} />

                <Text theme={'body-3'} className='color-text-secondary'>
                  Only PDF, DOC/X files smaller than 5MB
                </Text>

                <input
                  ref={inputRef}
                  style={{ display: 'none' }}
                  id='file'
                  type='file'
                  multiple={false}
                  accept='application/pdf, .doc, .docx'
                  onChange={handleFileChange}
                />
              </Column>

              <label htmlFor='file'>
                <Button onClick={onButtonClick} theme='primary' className={styles.button}>
                  Upload document
                </Button>
              </label>
            </UploadCardBg>
          )}
        </label>
      </form>
    </>
  )
}
