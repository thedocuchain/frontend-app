import React from 'react'
import { Html, Link, Head, Font, Text, Column, Row, Section, Container } from '@react-email/components'

import Header from 'src/emails/_components/header'
import Footer from 'src/emails/_components/footer'
import Preview from 'src/emails/_components/preview'
import Signers from 'src/emails/_components/signers'

export default function MyTemplate() {
  const meeting = {
    id: 'Y16334',
    title: 'Contractor Agreement',
    name: 'Elon Musk',
  }
  const { title, id, name } = meeting || {}

  return (
    <Html
      lang='en'
      style={{
        fontFamily: 'Inter',
        backgroundColor: '#F6F9FC',
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

      <body
        style={{
          backgroundColor: '#F6F9FC',
        }}
      >
        <Container>
          <Section style={form}>
            <Header id={id} />
            <Preview />

            <Row>
              {/* <Text style={titleText}>You have {title} to review and sign in Docuchain</Text> */}
              {/* <Text style={titleText}>You have been assigned as a Watcher of {title}</Text> */}
              <Text style={titleText}>
                🖊 New signature! {name} signed {title}
              </Text>
              {/* <Text style={titleText}>🎉 All signers completed with {title}</Text> */}
            </Row>
            <Signers />

            <Footer />
          </Section>

          <Row>
            <Column align='center'>
              <Text style={linkText}>
                DocuChain,{' '}
                <Link style={link} href='https://docuchain.io'>
                  DocuChain.io
                </Link>
              </Text>
            </Column>
          </Row>
        </Container>
      </body>
    </Html>
  )
}

const titleText = {
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '27px',
  margin: '20px 0 0 0',
  color: '#000',
}

const linkText = {
  margin: '0 0 32px 0',
  color: '#626C7F',
}

const link = {
  textDecoration: 'underline',
  color: '#626C7F',
}

const form = {
  margin: '40px auto 12px',
  display: 'flex',
  maxWidth: 600,
  width: '100%',
  minWidth: 200,
  height: '100%',
  TextAlign: 'left',
  WhiteSpace: 'pre-wrap',
  backgroundColor: '#FFFFFF',
  border: '1px solid #D0D5DD',
  borderRadius: 16,
  padding: '20px 24px 20px',
}
