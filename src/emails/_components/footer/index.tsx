import React from 'react'
import { Button, Column, Hr, Link, Row, Section, Text } from '@react-email/components'

export default function Footer(): JSX.Element {
  const downloadUrl =
    'https://example.com/download'

  return (
    <>
      <Hr style={separator} />

      <Section style={footer} align='left'>
        <Row style={row} align='left'>
          <Text style={text}>
            The document hash:{' '}
            <Link href={'https://docuchain.io'}>
              <span
                style={{
                  wordBreak: 'break-all',
                  lineHeight: '20px',
                  margin: 0,
                  color: '#626C7F',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.28px',
                }}
              >
                0xf7ba47d5ea8ec264f71e9ec37dae72f019a98eeeba3a3a33b029bf90ebf15821
              </span>
            </Link>
          </Text>
          <Text style={description}>
            Your document is securely stored on the blockchain forever and fully protected. You can always check if it
            has changed since signing.
          </Text>
        </Row>
        <Row style={row} align='left'>
          <Text style={text}>❗Do Not Share This Email</Text>
          <Text style={description}>
            This email contains a secure link to DocuChain. Please do not share this email, link, or access code with
            others.
          </Text>
        </Row>
        <Row style={row} align='left'>
          <Text style={text}>About DocuChain</Text>
          <Text style={description}>
            Quick digital signing of documents. Signing documents with DocuChain is legally binding and complies with
            business practices in security and safety.{' '}
            <Link href='https://docuchain.io' style={link}>
              More →
            </Link>
          </Text>
        </Row>
        <Row style={row} align='left'>
          <Text style={text}>Questions about the Document?</Text>
          <Text style={description}>
            If you need to modify the document or have questions about the details in the document, please reach out to
            the to the document&apos;s creator by emailing them directly.
          </Text>
        </Row>

        <Row>
          <Column align={'center'} valign={'bottom'}>
            <Button href={downloadUrl} style={button}>
              <Text style={textButton}>
                Download document
                <span style={{ marginLeft: 6, display: 'inline-block' }}>&#8595;</span>
              </Text>
            </Button>
          </Column>
        </Row>
      </Section>
    </>
  )
}

const footer = {
  width: '100%',
}

const separator = {
  marginTop: 20,
  marginBottom: 20,
}

const text = {
  color: '#626C7F',
  fontWeight: 700,
  lineHeight: '20px',
  margin: 0,
  letterSpacing: '0.28px',
}

const description = {
  color: '#626C7F',
  lineHeight: '20px',
  margin: 0,
  letterSpacing: '0.28px',
}

const link = {
  textDecoration: 'underline',
  color: '#626C7F',
  lineHeight: '20px',
  margin: 0,
  letterSpacing: '0.28px',
  whiteSpace: 'nowrap',
}

const row = {
  marginBottom: 9,
}

const button = {
  width: 230,
  maxWidth: 230,
  maxHeight: 44,
  height: 'fit-content',
  padding: '10px 24px',
  borderRadius: 6,
  border: '1px solid #9FE870',
  background: '#9FE870',
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  display: 'block',
  cursor: 'pointer',
  marginBottom: 24,
}

const textButton = {
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
