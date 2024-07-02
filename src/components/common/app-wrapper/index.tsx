import React, { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccessToken, setAccessToken } from 'src/store/reducers/auth'

export function AppWrapper(props: PropsWithChildren) {
  const token = useAppSelector(selectedAccessToken)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const newToken = router.query.token as string

  useEffect(() => {
    if (newToken && newToken !== token) {
      dispatch(setAccessToken(newToken))
    }
  }, [newToken])

  return <>{props.children}</>
}
