import { Component } from 'react'

export class ErrorBoundary extends Component<{ children: JSX.Element | JSX.Element[] }> {
  render() {
    return this.props.children
  }
}
