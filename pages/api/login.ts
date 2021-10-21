import { add } from 'date-fns'
import { fetchJson, CustomError } from 'app/lib/fetchJson'
import { withApiSession } from 'app/lib/session'

export interface TokensType {
  accessToken: string
  accessTokenExpiration: number
  refreshToken: string
  refreshTokenExpiration: Date
}

const AUTHENTICATION_API = 'http://localhost:8081/auth/realms/Perseus/protocol/openid-connect/token'

export default withApiSession(async (req, res) => {
  const { email, password } = await req.body

  try {
    const headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('grant_type', 'password')
    urlencoded.append('client_id', 'superfrontend')
    urlencoded.append('client_secret', '99fc14e7-18dc-4de9-ab2c-5d9ebec7b721')
    urlencoded.append('username', email)
    urlencoded.append('password', password)

    const requestOptions = {
      method: 'POST',
      headers,
      body: urlencoded,
    }

    /* eslint-disable camelcase */
    const data = await fetchJson<{
      access_token: string
      expires_in: number
      refresh_expires_in: number
      refresh_token: string
    }>(AUTHENTICATION_API, requestOptions)
    /* eslint-enable camelcase */

    const tokens = {
      accessToken: data.access_token,
      accessTokenExpiration: data.expires_in,
      refreshToken: data.refresh_token,
      refreshTokenExpiration: add(new Date(), { seconds: data.refresh_expires_in }),
    }

    req.session.set('tokens', tokens)
    await req.session.save()
    res.json(tokens)
  } catch (err) {
    const error = err as CustomError
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
