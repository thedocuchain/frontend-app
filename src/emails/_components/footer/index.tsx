import React from 'react'
import { Button, Column, Hr, Link, Row, Section, Text } from '@react-email/components'

export default function Footer(): JSX.Element {
  const downloadUrl =
    'https://storage.googleapis.com/docuchain-bucket/70e495ce-c9fa-4813-9df7-87edc0019b6a?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=docuchain%40coral-melody-424306-i7.iam.gserviceaccount.com%2F20240708%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240708T105217Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&response-content-type=application%2Foctet-stream&response-content-disposition=attachment%3B%20filename%3D%22%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%A0%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D0%904%2021%20x%2029.7%20%D1%81%D0%BC.pdf%22&X-Goog-Signature=8e50299415990d325522b3807bab46fed5b4abc716f03043ba029da5dc150f06a36ec84b090035986e83bb8ca2a4054c8a83c876ab60e14196e50cf6263109d89a9a7b00e91b68f8d3b091e6a9dc9e8d39d8cc6d93229f66fc36ffb543825842613aeaad24970c88aeb1a9086a942b1a06122e46861ad75ab3bd60b285e206bff09f54ccdfa6329d778494ead398ffd39170d62441a32b62a9ca6c397fcce6f4060234e37f0f429a83fbed33c622aa0bad0d8a8f744b2af43084291a17a5282702a2ec5fef703ac6e6b417ac4684618650a3097cb1d6acd00209bef4beef7f4cfae6fa814d297b5cc027cd8b72ad920c22da2881c20fb282ca97099010777c7b'

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
