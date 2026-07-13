import { useRouter } from 'next/router'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { useAppDispatch } from 'src/store/hooks'
import { logoutAccount } from 'src/store/reducers/account/actions/auth'

export function useAccountLogout() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  return useEvent(async () => {
    await dispatch(logoutAccount())
    void router.replace('/login')
  })
}
