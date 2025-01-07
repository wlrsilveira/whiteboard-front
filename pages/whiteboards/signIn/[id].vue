<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWhiteboardStore } from "@/stores/whiteboards";
import Drawing from '~/components/Whiteboard/Drawing.vue';

const route = useRoute();
const store = useWhiteboardStore();

onMounted(async () => {
  try {
    const id = route.params.id; 
    store.signInWithIdentifier(id); 
  } catch (error) {
    console.error('Error fetching whiteboard data:', error);
  }
});
</script>
<template>
  <div class="container mx-auto px-6 py-8">
    <Drawing v-if="store.currentWhiteboard" :whiteboard="store.currentWhiteboard" />
  </div>  
</template>
  

  