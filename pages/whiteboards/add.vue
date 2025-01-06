<script>
import { useWhiteboardStore } from "@/stores/whiteboards";
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
  
export default {
    setup() {
        const store = useWhiteboardStore();
        const newWhiteboard = ref({ name: "" });
        const lstErrors = ref([]);
        const router = useRouter()
        const createWhiteboard = async () => {
            try {
                const response = await store.createWhiteboard(newWhiteboard.value);
                if (response.id) {
                    Swal.fire({
                        title: "Whiteboards",
                        text: "New whiteboard registered successfully",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/whiteboards')
                        }
                    });
                }
            } catch (error) {
                newWhiteboard.value.name = "";
                if (error.response && error.response.data.errors) {
                    lstErrors.value = Object.values(error.response.data.errors).flat()
                }
            }
        };

        return {
            newWhiteboard,
            createWhiteboard,
            whiteboards: store.whiteboards,
            isLoading: store.isLoading,
            errors: store.errors,
            lstErrors,
        };
    },
};
</script>
<template>
    <div class="container mx-auto px-6 py-8">
        <div class="justify-between flex items-center mb-6">
            <h1 class="text-3xl font-bold text-orange-600 mb-6">New Whiteboard</h1>
            <router-link to="/whiteboards">
                <h3 class="text-1xl font-bold text-orange-600 mb-6">
                    < Back
                </h3>
            </router-link>
        </div>
        
        <form @submit.prevent="createWhiteboard" class="mb-6 bg-gray-100 p-4 rounded-md shadow">
            <div class="mb-4">
                <label for="name" class="block font-medium mb-1">Name:</label>
                <input
                    id="name"
                    type="text"
                    v-model="newWhiteboard.name"
                    placeholder="Enter whiteboard name"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                />
            </div>
            <div class="justify-end">
                <button
                    type="submit"
                    class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                    :disabled="isLoading"
                >
                    {{ isLoading ? "Creating..." : "Create" }}
                </button>
            </div>
            <div class="justify-center">
                <ul 
                    v-if="lstErrors.length" 
                    class="error-list p-1"
                >
                    <li 
                        v-for="(error, index) in lstErrors" 
                        :key="index"
                        class="text-red-500"
                    >
                        {{ error }}
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>