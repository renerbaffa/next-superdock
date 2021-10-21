import { NextApiResponse } from 'next'

function redirect(res: NextApiResponse, target = '/login'): void {
  console.log('redirect - from: ???, to:', target)
  res.setHeader('location', target)
  res.statusCode = 302
  res.end()
}

export { redirect }
