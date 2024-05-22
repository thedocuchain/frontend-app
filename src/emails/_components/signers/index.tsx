import React from 'react'
import { Link, Row, Text } from '@react-email/components'

export default function Signers(): JSX.Element {
  return (
    <>
      <Row>
        <Text style={title}>Signers:</Text>
        <Text style={list}>
          1. Alice Example <Link href={'mailto:alice@example.com'}>(alice@example.com)</Link>
        </Text>
        <Text style={list}>
          2. Bob Example{' '}
          <Link href={'mailto:bob@example.com'}>(bob@example.com)</Link>
        </Text>
        <Text style={title}>Watchers:</Text>
        <Text style={list}>
          1. Carol Example <Link href={'mailto:carol@example.com'}>(carol@example.com)</Link>
        </Text>
      </Row>
    </>
  )
}

const list = {
  margin: 0,
  color: '#000',
}

const title = {
  fontWeight: 600,
  margin: '12px 0 0 0',
  color: '#000',
}
