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
    imageLink:
      'https://storage.googleapis.com/docuchain-bucket/8c9eac34-1540-4057-b340-78496ba397f5.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=docuchain%40coral-melody-424306-i7.iam.gserviceaccount.com%2F20240613%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240613T100249Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&response-content-type=image%2Fpng&response-content-disposition=inline&X-Goog-Signature=0aa685027e699665442d71ca202475daafe6d57be9d135614093b27ac78b55b892e40adde1e85269e57d6deef2fe2d3139a27970d3df5a23f1e523926dde6b0194891441feb27703b34d426b3d089245e4101dab04da5820043c1bf3127f1be7e381a4fad254b52c0d008ff296a126655440db169e74ec7f9903ffa6f71ff332656c7e3383e6c1848bfb1579e54d3b35b5b0e91448920a4bbac1327edaef960830cc5d63c88c307e8036ef17ae99cb862166307165226c01a1606312682b9aa6a24ec041c0d24a0f86254cfc745822076c559191b1d82096ed49aaf77e15de33eeba344d4cf124b5a438f6742abc398379a74ef00bf84ce510f8c82f17f37604',
  }
  const { title, id, name, imageLink } = meeting || {}

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
            <Preview imageLink={imageLink} />

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
  minWidth: 300,
  height: '100%',
  TextAlign: 'left',
  WhiteSpace: 'pre-wrap',
  backgroundColor: '#FFFFFF',
  border: '1px solid #D0D5DD',
  borderRadius: 16,
  padding: '20px 24px 20px',
}
