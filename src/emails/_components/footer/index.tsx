import React from 'react'
import { Hr, Link, Row, Section, Text } from '@react-email/components'

export default function Footer(): JSX.Element {
  return (
    <>
      <Hr style={separator} />

      <Section style={footer} align='left'>
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
        <Row align='left'>
          <Text style={text}>Stop receiving this email</Text>
          <Text style={description}>
            <Link href='https://docuchain.io' style={link}>
              Report this email
            </Link>{' '}
            or read more about{' '}
            <Link href='https://docuchain.io' style={link}>
              Declining to sign
            </Link>{' '}
            and{' '}
            <Link href='https://docuchain.io' style={link}>
              Managing notifications.
            </Link>{' '}
            If you are having trouble signing the document,{' '}
            <Link href='https://docuchain.io' style={link}>
              please contact us →
            </Link>
          </Text>
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
