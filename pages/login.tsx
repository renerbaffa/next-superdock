import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from 'app/components/Layout'
import { fetchJson } from 'app/lib/fetchJson'
import { TokensType } from 'app/pages/api/login'

// TODO get rid of jwt decode library
interface Login extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: Login
}

function Login(): JSX.Element {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<LoginFormElement>) {
    event.preventDefault()

    try {
      const response = await fetchJson<TokensType>('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: event.currentTarget.elements.email.value,
          password: event.currentTarget.elements.password.value,
        }),
      })
      console.log('%cresponse after login', 'background: green; color: white;', response)
      router.replace('/profile')
    } catch (err) {
      setError(JSON.stringify(err, null, 2))
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email:
            <input type="text" id="email" name="email" defaultValue="rener.baffa+4@perseus.de" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input type="text" id="password" name="password" defaultValue="Qwer1234!" />
          </label>
        </div>
        {error ? (
          <div>
            <pre>{error}</pre>
          </div>
        ) : null}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </Layout>
  )
}

export default Login
