<script>
import { useWhiteboardStore } from "@/stores/whiteboards";
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2'
import EditWhiteboardModal from "@/components/Whiteboard/EditWhiteboardModal.vue";

export default {
    setup() {
        const store = useWhiteboardStore();
  
        const newWhiteboard = ref({ name: "" });
        const editingWhiteboard = ref(null);
        const seeQrCodeWhiteboard = ref(null);
        
        const editWhiteboard = (whiteboard) => {
            editingWhiteboard.value = { ...whiteboard };
        };
    
        const deleteWhiteboard = async (id) => {
            //
            Swal.fire({
                title: "Whiteboards",
                text: "Do you want to remove this whiteboard?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok!"
            }).then((result) => {
                if (result.isConfirmed) {
                    store.deleteWhiteboard(id);
                    Swal.fire({
                        title: "Whiteboards",
                        text: "Whiteboard removed successfully",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok!"
                    });
                }
            });
        };

        const seeQrCode = (whiteboard) => {
            alert('aqui')
            seeQrCodeWhiteboard.value = { ...whiteboard };
        };
    
        const cancelEdit = () => {
            editingWhiteboard.value = null;
        };
    
        onMounted(() => {
            store.fetchWhiteboards();
        });

        const convertToBase64 = (qrCode) => {
            return atob(qrCode);
        };
    
        return {
            newWhiteboard,
            editingWhiteboard,
            editWhiteboard,
            deleteWhiteboard,
            cancelEdit,
            store,
            error: store.error,
            convertToBase64
        };
    },
    components: {
        EditWhiteboardModal
    },
};
</script>
<template>
    <div class="container mx-auto px-6 py-8">
        <div class="justify-between flex items-center mb-6">
            <h1 class="text-3xl font-bold text-orange-600 mb-6">My Whiteboards</h1>
            <router-link to="/whiteboards/add">
                <h3 class="text-1xl font-bold text-orange-600 mb-6">
                    + Add new Whiteboard
                </h3>
            </router-link>
        </div>
        <div v-if="store.isLoading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <table class="table-auto w-full border-collapse border border-orange-200 rounded-lg">
                <thead>
                    <tr class="bg-orange-600 text-white">
                        <th class="border px-4 py-2">QrCode</th>
                        <th class="border px-4 py-2">ID</th>
                        <th class="border px-4 py-2">Name</th>
                        <th class="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="whiteboard in store.whiteboards" :key="whiteboard.id">
                        <td class="border px-4 py-2">
                            <div class="flex justify-center">
                                <div v-html="whiteboard.qrCode" alt="QR Code"/>
                            </div>
                        </td>
                        <td class="border px-4 py-2">{{ whiteboard.id }}</td>
                        <td class="border px-4 py-2">{{ whiteboard.name }}</td>
                        <td class="border px-4 py-2">
                            <button
                                class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
                                @click="editWhiteboard(whiteboard)"
                            >
                                Edit
                            </button>
                            <button
                                class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                @click="deleteWhiteboard(whiteboard.id)"
                            >
                                Delete
                            </button>                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <EditWhiteboardModal 
            v-if="editingWhiteboard" 
            :whiteboard="editingWhiteboard"
            @close="cancelEdit"
        />
    </div>
</template>