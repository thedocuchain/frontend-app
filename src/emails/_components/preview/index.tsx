import React from 'react'
import { Button, Column, Link, Row, Section, Text } from '@react-email/components'

export default function Preview({ imageLink }: { imageLink: string }): JSX.Element {
  const url = 'https://docuchain.io/app/doc/Y16334'
  return (
    <Section>
      <Link href={url}>
        <Row
          style={{
            ...wrapper,
            position: 'relative',
            // green gradient
            backgroundImage: `linear-gradient(rgba(245,253,241,0.5) 0%, rgba(245,253,241,1) 100%),
            url(${imageLink})`,
            //   white gradient
            //   backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%),
            // url(${imageLink})`,
          }}
        >
          <Column height={330} align={'center'} valign={'bottom'}>
            <Button href={url} style={button}>
              <Text style={text}>
                {/* View status */}
                {/* Review and Sign */}
                View completed document
                <span style={{ marginLeft: 6 }}>→</span>
              </Text>
            </Button>
          </Column>
        </Row>
      </Link>
    </Section>
  )
}

const wrapper = {
  width: '100%',
  minWidth: 300,
  height: 330,
  minHeight: 330,
  margin: 0,
  border: '1px solid #D0D5DD',
  borderRadius: 12,
  overflow: 'hidden',
  backgroundSize: 'cover',
}

const button = {
  width: 'fit-content',
  maxWidth: 260,
  maxHeight: 44,
  height: 'fit-content',
  padding: '10px 24px',
  borderRadius: 8,
  border: '1px solid #9FE870',
  background: '#9FE870',
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  display: 'block',
  cursor: 'pointer',
  marginBottom: 24,
}

const text = {
  display: 'block',
  fontWeight: 600,
  margin: 0,
  width: '100%',
  color: '#000',
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: '0.32px',
  whiteSpace: 'nowrap',
}
