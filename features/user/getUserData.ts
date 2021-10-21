import { fetchJson } from 'app/lib/fetchJson'
import { UserType } from '.'

async function getUserData(accessToken: string): Promise<UserType | null> {
  try {
    const user = await fetchJson<UserType>('http://localhost:3000/api/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return user
  } catch (error) {
    console.log('requireUser - error: ', error)
    return null
  }
}

export { getUserData }
