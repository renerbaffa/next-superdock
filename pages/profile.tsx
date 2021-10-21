import * as React from 'react'
import { Layout } from 'app/components/Layout'
import { withSession } from 'app/lib/session'
import { requireUser, useUserId, useUserUtils } from 'app/features/user'
import { redirect } from 'app/features/redirect'
import { fetchJson } from 'app/lib/fetchJson'

interface ProfilePageType {
  firstName: string
  lastName: string
}

interface ProfileType extends HTMLFormControlsCollection {
  firstName: HTMLInputElement
  lastName: HTMLInputElement
}

interface ProfileFormElement extends HTMLFormElement {
  readonly elements: ProfileType
}

// TODO create a middleware to always return user in withSession?????
export const getServerSideProps = withSession<{ props: Record<string, unknown> | ProfilePageType }>(
  async ({ req, res }) => {
    const user = await requireUser(req)
    console.log('%cgetServerSideProps - user', 'background: green; color: white;', user)

    // TODO I am not happy with this logic here ... can it be moved to requireUser function without compromising user type afterwards?
    if (!user) {
      // TODO should logout user here
      req.session.destroy()
      redirect(res)
      return { props: {} }
    }

    return {
      props: {
        /**
         * * Need to always return user so that we set up the user on MyApp.
         * * It WON'T be injected in your page.
         * * If you need it, please use `useUser()` hook
         */
        user,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    }
  },
)

function Profile({ firstName, lastName }: ProfilePageType): JSX.Element {
  const userId = useUserId()
  const { update } = useUserUtils()

  async function handleSubmit(event: React.FormEvent<ProfileFormElement>) {
    event.preventDefault()

    try {
      const response = await fetchJson<{ first_name: string; last_name: string }>(
        '/api/updateProfile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: event.currentTarget.elements.firstName.value,
            lastName: event.currentTarget.elements.lastName.value,
            userId,
          }),
        },
      )
      console.log('%cresponse after update', 'background: green; color: white;', response)
      update(response)
    } catch (err) {
      console.error('error when updating ')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Profile page (should be protected)</div>
      <div>
        <label htmlFor="email">
          First name:
          <input type="text" id="firstName" name="firstName" defaultValue={firstName} />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Last name:
          <input type="text" id="lastName" name="lastName" defaultValue={lastName} />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default Profile
