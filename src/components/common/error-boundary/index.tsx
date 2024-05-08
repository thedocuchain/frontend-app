import { Component } from 'react'

export class ErrorBoundary extends Component<{ children: JSX.Element | JSX.Element[] }> {
  componentDidCatch(err, info) {
    // eslint-disable-next-line no-console
    console.log(err, info)
  }

  render() {
    return this.props.children
  }
}
