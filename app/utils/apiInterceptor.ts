export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token')
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  }

  return fetch(url, {
    ...options,
    headers
  })
}
