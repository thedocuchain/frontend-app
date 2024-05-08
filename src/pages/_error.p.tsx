import { AppContext } from 'next/app'

import PageServerError from 'src/pages/error'

export default function Error() {
  return <PageServerError />
}

Error.getInitialProps = ({ req, err }: { req: AppContext['ctx']['req']; err: { statusCode: number } }) => {
  // eslint-disable-next-line no-console
  if (!req) return {}

  const statusCode = err?.statusCode || 404
  return { statusCode }
}
