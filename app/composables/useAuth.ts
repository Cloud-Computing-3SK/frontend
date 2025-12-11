export const useAuth = () => {
  const isAuthenticated = useState('isAuthenticated', () => {
    if (import.meta.client) {
      return !!localStorage.getItem('access_token')
    }
    return false
  })

  const login = (accessToken: string, refreshToken: string, username?: string, email?: string) => {
    if (import.meta.client) {
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      if (username) localStorage.setItem('username', username)
      if (email) localStorage.setItem('email', email)
      isAuthenticated.value = true
    }
  }

  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      isAuthenticated.value = false
    }
  }

  const checkAuth = () => {
    if (import.meta.client) {
      isAuthenticated.value = !!localStorage.getItem('access_token')
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}