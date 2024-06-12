import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import { Column } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { Button } from 'src/components/ui/button'
import { useAppDispatch } from 'src/store/hooks'
import { uploadDocument } from 'src/store/reducers/document/actions/files'

import styles from './styles.module.css'

export function StepNewDocument(): JSX.Element {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = React.useRef(null)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      if (file) {
        const response = await dispatch(uploadDocument({ file })).unwrap()

        if (response.redirectUrl) {
          // window.open(response.redirectUrl, '_self')

          const id = response.redirectUrl.slice(29)
          const link = `/doc/${id}`
          void router.push(link)
        }
      }
    })()
  }, [file])

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

          {!file && (
            <div className={styles.card}>
              <Column className='column-center text-center w100-p'>
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
            </div>
          )}
        </label>
      </form>
    </>
  )
}
