import { defineStore } from "pinia";

export const useWhiteboardStore = defineStore("whiteboardStore", {  
  state: () => ({
    whiteboards: [],
    currentWhiteboard: null,
    isLoading: false,
    errors: [],
  }),
  actions: {
    async fetchWhiteboards() {
      this.isLoading = true;
      this.error = null;
      this.whiteboards = [];
      try {
        const { $api } = useNuxtApp();
        this.isLoading = true;
        const response = await $api.get("/whiteboards");
        this.whiteboards = response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Error fetching whiteboards.";
      } finally {
        this.isLoading = false;
      }
    },

    async createWhiteboard(payload) {
      this.isLoading = true;
      this.error = null;
      this.errors = [];
      try {
        const { $api } = useNuxtApp();
        const response = await $api.post("/whiteboards", { name: payload.name });
        this.whiteboards.push(response.data.data);
        return response.data.data;
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = Object.values(error.response.data.errors).flat();
        } else {
          this.error = "An unexpected error occurred. Please try again.";
        }
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteWhiteboard(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const { $api } = useNuxtApp();
        await $api.delete(`/whiteboards/${id}`);
        this.whiteboards = this.whiteboards.filter((wb) => wb.id !== id);
      } catch (error) {
        this.error = error.response?.data?.message || "Error deleting whiteboard.";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async updateWhiteboard(id, payload) {
      this.isLoading = true;
      this.error = null;
      this.errors = [];
      try {
        const { $api } = useNuxtApp();
        await $api.put(`/whiteboards/${id}`, payload);
        this.fetchWhiteboards();
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = Object.values(error.response.data.errors).flat();
        } else {
          this.error = "An unexpected error occurred. Please try again.";
        }
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async signInWithIdentifier(identifier) {
      this.isLoading = true;
      this.error = null;
      try {
        const { $api } = useNuxtApp();
        const response = await $api.get(`/whiteboards/${identifier}`);
        this.currentWhiteboard = response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Error signing in.";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async drawing(payload) {
      this.isLoading = true;
      this.error = null;
      try {
        const { $api } = useNuxtApp();
        const test = await $api.post(`/whiteboards/${this.currentWhiteboard.identifier}/drawing`, payload);
        console.log(test)
      } catch (error) {
        this.error = error.response?.data?.message || "Error signing in.";
        console.log(error)
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    initializePusher() {
      const config = useRuntimeConfig();
      if (!this.pusher) {
        this.pusher = new Pusher(config.public.pusherAppKey, {
          cluster: config.public.pusherCluster,
        });
      }
    },
    subscribeToWhiteboard() {
      if (this.channel) {
        this.channel.unsubscribe();
      }
      this.channel = this.pusher.subscribe(this.currentWhiteboard.identifier);
      console.log(`Subscrito ao canal: ${this.currentWhiteboard.identifier}`);
    },
    bindDrawingUpdated(callback) {
      if (this.channel) {
        this.channel.bind("DrawingUpdated", callback);
      }
    },
    unbindDrawingUpdated() {
      if (this.channel) {
        this.channel.unbind("DrawingUpdated");
      }
    },

  },
});
