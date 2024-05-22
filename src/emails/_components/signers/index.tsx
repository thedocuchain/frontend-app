import React from 'react'
import { Link, Row, Text } from '@react-email/components'

export default function Signers(): JSX.Element {
  return (
    <>
      <Row>
        <Text style={title}>Signers:</Text>
        <Text style={list}>
          1. Taylor Swift <Link href={'mailto:taylorswift@atomic.com'}>(taylorswift@atomic.com)</Link>
        </Text>
        <Text style={list}>
          2. Konstantin Konstantinopolskiy{' '}
          <Link href={'mailto:KonstantinKonstantinopolskiy@gmail.com'}>(KonstantinKonstantinopolskiy@gmail.com)</Link>
        </Text>
        <Text style={title}>Watchers:</Text>
        <Text style={list}>
          1. Elon Musk <Link href={'mailto:musk@atomic.com'}>(musk@atomic.com)</Link>
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
