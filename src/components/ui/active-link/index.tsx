import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function ActiveLink(props) {
  const router = useRouter()
  const href = props.href !== '/' ? props.href.replace(/\/$/, '').trim() : '/'

  return (
    <Link href={props.href}>
      <a className={cn(props.className, { [props.activeClassName]: router.asPath === href })}>{props.children}</a>
    </Link>
  )
}
