import * as React from 'react'
import { Layout } from 'app/components/Layout'
import { withSession } from 'app/lib/session'
import { requireUser } from 'app/features/user'

const getServerSideProps = withSession<{ props: Record<string, unknown> }>(({ req, res }) => {
  const user = requireUser(req)
  console.log('%cuser', 'background: green; color: white;', user)

  return {
    props: {},
  }
})

function Dashboard(): JSX.Element {
  return <div>Dashboard</div>
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export { getServerSideProps }
export default Dashboard
