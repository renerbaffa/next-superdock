// import { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from 'app/features/user'
import { CompanyType } from 'app/features/company'
import { withApiSession } from 'app/lib/session'
import { fetchJson } from 'app/lib/fetchJson'

// export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
export default withApiSession(async (req, res) => {
  const { authorization: accessToken } = req.headers
  console.log('API /me - access token:', accessToken)

  if (!accessToken) {
    req.session.destroy()
    res.writeHead(302, { Location: '/login' }).end()
  }

  // TODO introduce a graphql layer to get only what is needed?!
  try {
    const userAccess = await fetchJson<{ data: UserType }>(
      'http://localhost:8080/api/v1/users/me',
      {
        method: 'GET',
        headers: {
          // TODO can I do ...req.headers instead of defining them like this?
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const userData = await fetchJson<{ data: CompanyType }>(
      `http://localhost:8080/api/v1/users/${userAccess.data.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    console.log('API /me - user data:', { ...userAccess.data, ...userData.data })

    res.status(200)
    res.json({ ...userAccess.data, ...userData.data })
  } catch (error) {
    // TODO retry when accessToken is expired (status === 401 && statusText === 'Unauthorized')
    console.log('API /me - error: ', error)
    res.status(500)
    res.json(error)
  }
})
