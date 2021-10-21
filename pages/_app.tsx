import * as React from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Global } from '@emotion/react'
import { UserProvider, UserType } from 'app/features/user'

interface MyAppType extends AppProps {
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactElement
  }
  pageProps: {
    user: null | UserType
  }
}

function MyApp({ Component, pageProps }: MyAppType): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { user, ...props } = pageProps

  console.log('where does this console show up???')

  React.useEffect(() => {
    console.log('how about this one?')
  }, [])

  return (
    <UserProvider user={user}>
      {getLayout(
        <>
          <Global
            styles={{
              '*, *::before, *::after': {
                boxSizing: 'border-box',
              },
              body: {
                margin: 0,
                fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                Arial, Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                'Noto Color Emoji`,
              },
            }}
          />
          <Component {...props} />
        </>,
      )}
    </UserProvider>
  )
}

export default MyApp
