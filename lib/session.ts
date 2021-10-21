import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'

export interface NextIronRequest extends NextApiRequest {
  session: Session
}

type NextIronSSRHandlerType<ResponseType> = ({
  req,
  res,
}: {
  req: NextIronRequest
  res: NextApiResponse
}) => ResponseType | Promise<ResponseType>

type NextIronApiHandlerType = (req: NextIronRequest, res: NextApiResponse) => Promise<void>

const sessionConfig = {
  password: 'Qwer1234!Qwer1234!Qwer1234!Qwer1234!',
  cookieName: 'next-iron-session/examples/next.js',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

function withSession<ResponseType>(handler: NextIronSSRHandlerType<ResponseType>): unknown {
  return withIronSession(({ req, res }: { req: NextIronRequest; res: NextApiResponse }) => {
    const tokens = req.session.get('tokens')
    console.log('tokens????????', tokens)
    return handler({ req, res })
  }, sessionConfig)
}

function withApiSession(handler: NextIronApiHandlerType): unknown {
  return withIronSession(handler, sessionConfig)
}

export { withSession, withApiSession }
