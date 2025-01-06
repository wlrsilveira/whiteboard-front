<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)
const router = useRouter()

const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
}
</script>

<template>
    <header class="bg-white shadow-md">
        <div class="container mx-auto flex justify-between items-center px-6 py-4">

        <div class="text-2xl font-bold text-orange-600">
            <router-link to="/dashboard">
            <img 
                src="/assets/img/logo.png" 
                alt="Logo" 
                :class="mobileMenuOpen ? 'h-8' : 'h-24'"             
            />
            </router-link>
        </div>

        <button 
            class="md:hidden text-gray-700 focus:outline-none" 
            @click="mobileMenuOpen = !mobileMenuOpen"
        >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2" 
            stroke="currentColor" 
            class="w-6 h-6"
            >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M4 6h16M4 12h16M4 18h16" 
            />
            </svg>
        </button>

        <nav class="hidden md:flex items-center space-x-4">
            <router-link 
            to="/whiteboards" 
            class="text-gray-600 hover:text-orange-600 font-medium"
            >
            Whiteboards
            </router-link>

            <div class="relative">
            <button 
                class="text-gray-700 font-medium focus:outline-none" 
                @click="dropdownOpen = !dropdownOpen"
            >
                {{ authStore.user?.name || 'User' }}
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="2" 
                stroke="currentColor" 
                class="w-4 h-4 inline ml-1"
                >
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M19 9l-7 7-7-7" 
                />
                </svg>
            </button>

            <div 
                v-if="dropdownOpen" 
                class="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 z-50"
            >
                <button 
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-gray-600 hover:bg-orange-100"
                >
                Logout
                </button>
            </div>
            </div>
        </nav>
        </div>


        <div 
        v-if="mobileMenuOpen" 
        class="md:hidden bg-gray-100 px-6 py-4"
        >
        <div class="relative">
            <button 
            class="text-gray-700 font-medium focus:outline-none w-full text-left" 
            @click="dropdownOpen = !dropdownOpen"
            >
            {{ authStore.user?.name || 'User' }}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="2" 
                stroke="currentColor" 
                class="w-4 h-4 inline ml-1"
            >
                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M19 9l-7 7-7-7" 
                />
            </svg>
            </button>

            <div 
            v-if="dropdownOpen" 
            class="bg-white shadow-md rounded-md mt-2"
            >
            <router-link 
                to="/whiteboards" 
                class="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
                Whiteboards
            </router-link>
            <button 
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
                Logout
            </button>
            </div>
        </div>
        </div>
    </header>
</template>
  
