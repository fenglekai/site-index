import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", {
  state: () => ({
    loading: false,
    loadingCompleted: false
  }),
  getters: {
    isLoading: (state) => state.loading,
    isCompleted: (state) => state.loadingCompleted,
  },
  actions: {
    setLoading(status: boolean) {
      this.loading = status;
    },
    setLoadingComplete(status: boolean) {
      this.loadingCompleted = status;
    },
  },
});

export default useBaseStore
