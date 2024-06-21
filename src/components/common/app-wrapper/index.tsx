import React, { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedAccessToken, setAccessToken } from 'src/store/reducers/auth'

export function AppWrapper(props: PropsWithChildren) {
  const token = useAppSelector(selectedAccessToken)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const apiKey = router.query.apiKey as string

  useEffect(() => {
    if (apiKey && apiKey !== token) {
      dispatch(setAccessToken(apiKey))
    }
  }, [apiKey])

  return <>{props.children}</>
}
