import { fetchJson } from 'app/lib/fetchJson'
import router from 'next/router'
import * as React from 'react'

export interface UserType {
  id: number
  first_name: string
  last_name: string
  email: string
}

type UserActionType = { type: 'LOGOUT' } | { type: 'UPDATE'; user: Partial<UserType> | null }

export interface UserUtilsType {
  logout: () => void
  update: (user: Partial<UserType>) => void
}

const UserContext = React.createContext<UserType | null>(null)
UserContext.displayName = 'UserContext'

const UserIdContext = React.createContext<number>(0)
UserIdContext.displayName = 'UserIdContext'

const UserUtilsContext = React.createContext<UserUtilsType>({
  logout: () => undefined,
  update: (_newUser: Partial<UserType>) => undefined,
})
UserUtilsContext.displayName = 'UserUtilsContext'

function reducer(state: UserType | null, action: UserActionType): UserType | null {
  switch (action.type) {
    case 'UPDATE': {
      if (state) {
        return { ...state, ...action.user }
      }
      return action.user as UserType
    }
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

function UserProvider({
  children,
  user: initialUser,
}: {
  children: React.ReactNode
  user: UserType | null
}): JSX.Element {
  const [user, dispatch] = React.useReducer(reducer, initialUser)
  const [userId, setUserId] = React.useState(user?.id ?? 0)
  const memoizedUserId = React.useMemo(() => userId ?? 0, [userId])

  React.useEffect(() => {
    if (initialUser?.id !== user?.id) {
      dispatch({ type: 'UPDATE', user: initialUser })
    }
  }, [initialUser, user])

  React.useEffect(() => {
    if (user && user.id !== userId) {
      setUserId(user.id)
    }
  }, [user, userId])

  const logout = React.useCallback(async () => {
    try {
      await fetchJson('/api/logout', { method: 'POST' })
      dispatch({ type: 'LOGOUT' })
      // TODO does this router.push() work??
      router.push('/login')
    } catch (err) {
      console.warn('Error when logging out: ', err)
    }
  }, [])

  const update = React.useCallback((newUser: Partial<UserType>) => {
    dispatch({ type: 'UPDATE', user: newUser })
  }, [])

  const userUtils = React.useMemo(() => ({ logout, update }), [logout, update])

  return (
    <UserUtilsContext.Provider value={userUtils}>
      <UserContext.Provider value={user}>
        <UserIdContext.Provider value={memoizedUserId}>{children}</UserIdContext.Provider>
      </UserContext.Provider>
    </UserUtilsContext.Provider>
  )
}

function useUserId(): number {
  return React.useContext(UserIdContext)
}

function useUser(): UserType | null {
  return React.useContext(UserContext)
}

function useUserUtils(): UserUtilsType {
  return React.useContext(UserUtilsContext)
}

export { UserProvider, useUser, useUserId, useUserUtils }
