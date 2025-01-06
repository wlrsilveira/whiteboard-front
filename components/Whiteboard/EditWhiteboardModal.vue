<script setup>
    import { useWhiteboardStore } from "@/stores/whiteboards";
    import { ref, onMounted } from "vue";
    import Swal from 'sweetalert2'

    const store = useWhiteboardStore();
    const lstErrors = ref([]);

    const props = defineProps({
        whiteboard: {
            type: Object,
            required: true,
        },
    });

    const update = async () => {
        try {
            const response = await store.updateWhiteboard(props.whiteboard.id, {
                name: props.whiteboard.name,
            });
            if (response.id) {
                Swal.fire({
                    title: "Whiteboards",
                    text: "Whiteboard updated successfully",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        props.whiteboard.value = null;
                    }
                });
            }
        } catch (error) {
            props.whiteboard.name = "";
            if (error.response && error.response.data.errors) {
                lstErrors.value = Object.values(error.response.data.errors).flat()
            }
        }
    };

    const emit = defineEmits(["close"]);
</script>
<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 class="text-lg font-semibold mb-3">Edit Whiteboard</h2>
            <form @submit.prevent="update">
                <div class="mb-4">
                    <label for="edit-name" class="block font-medium mb-1">Name:</label>
                    <input
                        id="edit-name"
                        type="text"
                        v-model="props.whiteboard.name"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div class="flex justify-end space-x-2">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                        :disabled="store.isLoading"
                    >
                        {{ store.isLoading ? "Saving..." : "Save" }}
                    </button>
                </div>
            </form>
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
        </div>
    </div>
</template>