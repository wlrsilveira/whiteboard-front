<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2'
  
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const errors = ref([])
    const authStore = useAuthStore()
  
    const login = async () => {
        try {
            const { $api } = useNuxtApp()
            const response = await $api.post('/login', { email: email.value, password: password.value })
            
            const user = response.data.data
            localStorage.setItem('user', JSON.stringify(user))
            
            const token = user.access_token
            localStorage.setItem('authToken', token)

            authStore.login(user)
            
            location.href = '/dashboard'
        } catch (error) {
            if (error.response && error.response.data.errors) {
                errors.value = Object.values(error.response.data.errors).flat()
            }
        }
    }
</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-2 ">
      <div class="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
        <img src="/assets/img/logo.png" alt="Logo" class="mx-auto mb-6" />
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <div class="mb-6">
            <button
              type="submit"
              class="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <ul 
          v-if="errors.length" 
          class="error-list p-1"
        >
          <li 
            v-for="(error, index) in errors" 
            :key="index"
            class="text-red-500"
          >
            {{ error }}
          </li>
        </ul>
        <p class="text-center text-gray-600">
            Don't have an account?
          <a
            href="/register"
            class="text-orange-500 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  </template>
  

  