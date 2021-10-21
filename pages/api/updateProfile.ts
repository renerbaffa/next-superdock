// import { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from 'app/features/user'
import { CompanyType } from 'app/features/company'
import { withApiSession } from 'app/lib/session'
import { fetchJson } from 'app/lib/fetchJson'

// export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
export default withApiSession(async (req, res) => {
  const { accessToken } = req.session.get('tokens')
  console.log('API /updateProfile - req.headers:', accessToken)
  const { firstName, lastName, userId } = req.body

  if (!accessToken) {
    req.session.destroy()
    res.writeHead(302, { Location: '/login' }).end()
  }

  try {
    const response = await fetchJson<{ data: { first_name: string; last_name: string } }>(
      `http://localhost:8080/api/v1/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      },
    )
    console.log('API /updateProfile - response:', response)
    res.status(200)
    res.json(response.data)
  } catch (error) {
    console.log('API /updateProfile - error: ', error)
    res.status(500)
    res.json(error)
  }
})
