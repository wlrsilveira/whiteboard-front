export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
      const storedUser = localStorage.getItem('user')
      const user = storedUser ? JSON.parse(storedUser) : null
  
      if (!user) {
        return navigateTo('/')
      }
    }
  })
  