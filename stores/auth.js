import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    login(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('authToken', user.access_token)
    },
    async logout() {
      try {
        const { $api } = useNuxtApp()
        await $api.post('/logout')

        this.user = null
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')

        navigateTo('/')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    initialize() {
      const storedUser = process.client ? localStorage.getItem('user') : null
      this.user = storedUser ? JSON.parse(storedUser) : null
    },
  },
})
