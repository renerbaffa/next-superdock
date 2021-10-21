import { NextIronRequest } from 'app/lib/session'
import { UserType, getUserData } from '.'

async function requireUser(req: NextIronRequest): Promise<null | UserType> {
  const tokens = req.session.get('tokens')

  console.log('requireUser - tokens:', tokens)

  if (!tokens || !tokens.accessToken) {
    return null
  }

  const { accessToken } = tokens as { accessToken: string }
  const user = await getUserData(accessToken)
  console.log('requireUser - user:', user)
  return user
}

export { requireUser }
