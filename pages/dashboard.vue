<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

definePageMeta({
  middleware: 'auth',
})

onMounted(() => {
  authStore.initialize()
})

const cards = ref([
  { id: 1, title: 'My Whiteboards', count: authStore?.user?.whiteboards?.length },
  { id: 2, title: 'Whiteboards that I collaborate with', count: 1 },
])
</script>
<template>
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-3xl font-bold text-orange-600 mb-6">My Dashboard</h1>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="card in cards"
          :key="card.id"
          class="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
        >
          <h3 class="text-xl font-semibold text-orange-600 mb-2">{{ card.count }}</h3>
          <h2 class="text-orange-500">{{ card.title }}</h2>
        </div>
      </div>
    </div>
</template>