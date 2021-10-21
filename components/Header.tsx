import * as React from 'react'
import Link from 'next/link'
import { useUserId, useUserUtils } from 'app/features/user'

function Header(): JSX.Element {
  const userId = useUserId()
  const { logout } = useUserUtils()
  // TODO try out with useUserId and check if it gets rerendered when the rest of the user profile is changed
  console.log('%cHeader - user:', 'background: green; color: white;', userId)

  return (
    <header css={{ padding: '0.2rem', color: '#fff', backgroundColor: '#333' }}>
      <nav>
        <ul
          css={{
            display: 'flex',
            listStyle: 'none',
            marginLeft: 0,
            paddingLeft: 0,
            li: {
              marginRight: '1rem',
              display: 'flex',
            },
            'li:first-of-type': {
              marginLeft: 'auto',
            },
          }}
        >
          <li css={{ '> a': { color: 'white', textDecoration: 'none' } }}>
            {/* // TODO can we prevent the navigation to the same page? */}
            <Link href="/profile">Profile</Link>
          </li>
          <li css={{ '> a': { color: 'white', textDecoration: 'none' } }}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {userId ? (
            <li css={{ '> a': { color: 'white', textDecoration: 'none' } }}>
              <button type="button" onClick={() => logout()}>
                Logout
              </button>
            </li>
          ) : (
            <li css={{ '> a': { color: 'white', textDecoration: 'none' } }}>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export { Header }
