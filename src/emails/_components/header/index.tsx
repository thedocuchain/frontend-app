import React from 'react'
import { Column, Hr, Img, Link, Section, Text } from '@react-email/components'

export default function Header(props: { id: string }): JSX.Element {
  return (
    <>
      <Section style={header}>
        <Column align='left' width={150}>
          <Link href={'https://docuchain.io'}>
            <Img src={'https://docuchain.io/app/assets/logo.png'} width={151} alt='' />
          </Link>
        </Column>
        <Column align='right' width={450}>
          {/* <Text style={title}>ID: {props.id} (in progress)</Text> */}
          <Text style={title}>ID: {props.id} (Completed)</Text>
        </Column>
      </Section>

      <Hr style={separator} />
    </>
  )
}

const header = {
  width: '100%',
  margin: '18px 0',
}

const title = {
  color: '#626C7F',
  margin: 0,
}

const separator = {
  margin: '0 0 20px 0',
}
