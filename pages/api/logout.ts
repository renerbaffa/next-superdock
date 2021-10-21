import { withApiSession } from 'app/lib/session'

export default withApiSession(async (req, res) => {
  req.session.destroy()
  res.writeHead(302, { Location: '/login' }).end()
})
