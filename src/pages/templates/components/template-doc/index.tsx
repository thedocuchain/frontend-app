import React from 'react'
import cn from 'classnames'

import { ContractTemplate, TemplateLine } from 'src/configs/templates'

import styles from './styles.module.css'

type LineProps = {
  line: TemplateLine
  values?: Record<string, string>
}

function Line({ line, values }: LineProps) {
  if (typeof line === 'number') {
    return <span className={styles.bar} style={{ width: `${line}%` }} />
  }

  const value = values?.[line]
  if (value) {
    return <span className={styles.fieldFilled}>{value}</span>
  }

  return <span className={styles.field} />
}

function DocHead({ template }: { template: ContractTemplate }) {
  return (
    <div className={styles.head}>
      <div className={styles.docTitle}>{template.docTitle}</div>
      <div className={styles.docSubtitle}>{template.docSubtitle}</div>
    </div>
  )
}

function Signatures({ template }: { template: ContractTemplate }) {
  return (
    <div className={styles.signatures}>
      {template.signatures.map((label) => (
        <div key={label} className={styles.signature}>
          <span className={styles.signLine} />
          <span className={styles.signLabel}>{label}</span>
        </div>
      ))}
    </div>
  )
}

type TemplateDocProps = {
  template: ContractTemplate
  values?: Record<string, string>
  full?: boolean
  className?: string
}

export function TemplateDoc({ template, values, full, className }: TemplateDocProps) {
  if (!full) {
    return (
      <div className={cn(styles.page, className)}>
        <DocHead template={template} />
        <div className={styles.lines}>
          {template.cover.map((line, index) => (
            <Line key={index} line={line} values={values} />
          ))}
        </div>
        <Signatures template={template} />
      </div>
    )
  }

  let sectionNumber = 0

  return (
    <div className={cn(styles.pages, className)}>
      {template.pages.map((page, pageIndex) => (
        <div key={pageIndex} className={styles.page}>
          {pageIndex === 0 && <DocHead template={template} />}
          {page.map((section, sectionIndex) => {
            if (section.heading) sectionNumber += 1
            return (
              <div key={sectionIndex} className={styles.section}>
                {section.heading && (
                  <div className={styles.heading}>
                    {sectionNumber}. {section.heading}
                  </div>
                )}
                <div className={styles.lines}>
                  {section.lines.map((line, index) => (
                    <Line key={index} line={line} values={values} />
                  ))}
                </div>
              </div>
            )
          })}
          {pageIndex === template.pages.length - 1 && <Signatures template={template} />}
        </div>
      ))}
    </div>
  )
}
