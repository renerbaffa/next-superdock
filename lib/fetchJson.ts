export interface CustomError extends Error {
  data?: unknown
  response?: Response
}

async function fetchJson<ResponseType>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ResponseType> {
  try {
    console.log('fetchJson - URL', input, init)
    const response = await fetch(input, init)
    console.log('fetchJson - Response', response)
    const data = await response.json()

    console.log('fetchJson - Data', data)

    if (response.ok) {
      return data
    }

    const error: CustomError = new Error(response.statusText)
    error.response = response
    error.data = data
    throw error
  } catch (err: unknown) {
    const error: CustomError = err as CustomError
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}

export { fetchJson }
