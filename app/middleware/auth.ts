export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (import.meta.server) return

  const token = localStorage.getItem('access_token')

  // If no token and trying to access protected route
  if (!token) {
    return navigateTo('/login')
  }
})