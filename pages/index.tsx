import * as React from 'react'
import { GetStaticPropsResult } from 'next'
import { Layout } from '../components/Layout'

interface UserType {
  id: number
  firstName: string
  lastName: string
}

interface HopePageType {
  id: number
  userName: string
}

function getData(): Promise<UserType> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: 1,
          firstName: 'Rener',
          lastName: 'Baffa da Silva',
        }),
      4000,
    )
  })
}

export async function getServerSideProps(): Promise<GetStaticPropsResult<HopePageType>> {
  const user = await getData()
  console.log('in the server???', user)

  return {
    props: {
      id: user.id,
      userName: `${user.firstName} ${user.lastName}`,
    },
  }
}

function HomePage({ id, userName, ...props }: HopePageType): JSX.Element {
  console.log('in the client', id, userName, props)
  return (
    <Layout>
      <div>Hello NextJS World!!!</div>
    </Layout>
  )
}

export default HomePage
