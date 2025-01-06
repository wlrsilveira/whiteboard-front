<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2'
  
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const password_confirmation = ref('')
    const router = useRouter()
    const errors = ref([])

    const showRegisterButton = computed(() => {
      return email.value && 
        password.value && 
        name.value && 
        password_confirmation.value && 
        (password.value === password_confirmation.value)
    })
  
    const register = async () => {
      try {
        const { $api } = useNuxtApp()
        const response = await $api.post('/register', { 
          email: email.value, 
          password: password.value,
          name: name.value,
          password_confirmation: password_confirmation.value
        })
        
        console.log(response)
        errors.value = []
        if (response.status === 201) {
          Swal.fire({
            title: "Register",
            text: "Registration completed successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok!"
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/')
            }
          });
        }
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
        <img 
          src="/assets/img/logo.png" 
          alt="Logo" 
          class="mx-auto mb-6" 
        />
        <form @submit.prevent="register">
          <div class="mb-4">
            <label 
              for="name" 
              class="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="name"
              v-model="name"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Name"
            />
          </div>
          <div class="mb-4">
            <label 
              for="email" 
              class="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Email"
            />
          </div>
          <div class="mb-4">
            <label 
              for="password" 
              class="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Password"
            />
          </div>
          <div class="mb-4">
            <label 
              for="password" 
              class="block text-gray-700 font-medium mb-2"
            >
              Password Confirmation
            </label>
            <input
              id="password_confirmation"
              type="password"
              v-model="password_confirmation"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Password Confirmation"
            />
          </div>
          <div 
            v-if="showRegisterButton"
            class="mb-6" 
          >
            <button
              type="submit"
              class="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Register
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
            Have an account?
          <a
            href="/"
            class="text-orange-500 hover:underline font-medium"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  </template>
  

  