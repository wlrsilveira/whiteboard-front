import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
  })

  api.interceptors.request.use(async (config) => {
    const authStore = useAuthStore()
    const token = authStore.user?.access_token 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        location.href = '/'
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api,
    },
  }
})
