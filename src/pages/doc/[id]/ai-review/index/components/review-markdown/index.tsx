import React from 'react'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

type Block =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'bullet'; items: string[] }
  | { type: 'paragraph'; text: string }

const HEADING = /^(#{2,3})\s+(.*)$/
const BULLET = /^\s*[-*•]\s+(.*)$/
const BOLD = /\*\*(.+?)\*\*/g

// The model answers in a narrow markdown subset, so no markdown dependency.
function parse(markdown: string): Block[] {
  const blocks: Block[] = []
  let paragraph: string[] = []
  let bullets: string[] = []

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
      paragraph = []
    }
  }

  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: 'bullet', items: bullets })
      bullets = []
    }
  }

  markdown.split('\n').forEach((line) => {
    const heading = line.match(HEADING)
    if (heading) {
      flushParagraph()
      flushBullets()
      blocks.push({ type: 'heading', level: heading[1].length === 2 ? 2 : 3, text: heading[2] })
      return
    }

    const bullet = line.match(BULLET)
    if (bullet) {
      flushParagraph()
      bullets.push(bullet[1])
      return
    }

    if (!line.trim()) {
      flushParagraph()
      flushBullets()
      return
    }

    flushBullets()
    paragraph.push(line.trim())
  })

  flushParagraph()
  flushBullets()

  return blocks
}

function Inline({ text }: { text: string }) {
  const parts = text.split(BOLD)

  return (
    <>
      {parts.map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : part))}
    </>
  )
}

export function ReviewMarkdown({ content }: { content: string }) {
  return (
    <div className={styles.root}>
      {parse(content).map((block, index) => {
        if (block.type === 'heading') {
          return (
            <Text
              key={index}
              theme={block.level === 2 ? 'headline-2' : 'headline-3'}
              className={styles.heading}
            >
              <Inline text={block.text} />
            </Text>
          )
        }

        if (block.type === 'bullet') {
          return (
            <ul key={index} className={styles.list}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Text theme='body-2'>
                    <Inline text={item} />
                  </Text>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <Text key={index} theme='body-2' className={styles.paragraph}>
            <Inline text={block.text} />
          </Text>
        )
      })}
    </div>
  )
}
