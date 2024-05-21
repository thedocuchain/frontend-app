import React from 'react'
import { Html, Head, Font, Text, Column, Row, Section, Container } from '@react-email/components'

export default function MyTemplate() {
  const meeting = {
    title: 'title',
  }
  const { title } = meeting || {}

  return (
    <Html
      lang='en'
      style={{
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter',
      }}
    >
      <Head>
        <Font
          fontFamily='Inter'
          fallbackFontFamily='Helvetica'
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>

      <Container>
        <Section style={form}>
          <Row>
            <Column width={100}>
              <Text
                style={{
                  fontWeight: 600,
                  margin: '10px 0',
                }}
              >
                What
              </Text>
            </Column>
            <Column>
              <Text style={text}>{title}</Text>
            </Column>
          </Row>
        </Section>
      </Container>
    </Html>
  )
}

const text = {
  margin: '10px 0',
}

const form = {
  margin: '20px auto',
  display: 'flex',
  maxWidth: 620,
  width: '100%',
  minWidth: 350,
  maxHeight: 760,
  height: '100%',
  padding: 10,
  TextAlign: 'left',
  WhiteSpace: 'pre-wrap',
}
