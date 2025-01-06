<script setup>
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <div>
    <template v-if="authStore.user">
      <NuxtLayout>
        <NuxtPage />
        <NuxtRouteAnnouncer />
      </NuxtLayout>
    </template>
    <template v-else>
      <NuxtPage />
    </template>
  </div>
</template>
