<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWhiteboardStore } from "@/stores/whiteboards";

const route = useRoute();
const whiteboard = ref(null);
const store = useWhiteboardStore();

onMounted(async () => {
  try {
    const id = route.params.id; 
    const response = store.signInWithIdentifier(id); 
  } catch (error) {
    console.error('Error fetching whiteboard data:', error);
  }
});
</script>
<template>
    <div>
      <h1>Sign In for Whiteboard</h1>
      <div>
        <p><strong>ID:</strong> {{ store.currentWhiteboard?.id }}</p>
        <p><strong>Name:</strong> {{ store.currentWhiteboard?.name }}</p>
        <p><strong>Identifier:</strong> {{ store.currentWhiteboard?.identifier }}</p>
      </div>
    </div>
  </template>
  

  