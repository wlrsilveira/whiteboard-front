<script setup>
    import Navbar from '~/components/Navbar.vue'
</script>
<template>
    <div class="flex flex-col h-screen">
        <Navbar />
        <main class="flex-1 bg-gray-100">
            <slot />
        </main>
    </div>
</template>