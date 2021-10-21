import * as React from 'react'
import Head from 'next/head'
import { Header } from 'app/components/Header'

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <Head>
        <title>Page title22</title>
      </Head>
      <Header />
      <main>
        <div
          css={{
            maxWidth: '65rem',
            margin: '1.5rem auto',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          {children}
        </div>
      </main>
    </>
  )
}

export { Layout }
