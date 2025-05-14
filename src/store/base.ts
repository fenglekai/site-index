import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", {
  state: () => ({
    loading: false,
    loadingCompleted: false,
    navScrollTop: 0,
    loadPage: 0,
    loadStatus: false,
  }),
  getters: {
    isLoading: (state) => state.loading,
    isCompleted: (state) => state.loadingCompleted,
    getNavScrollTop: (state) => state.navScrollTop,
    getloadPage: (state) => state.loadPage,
  },
  actions: {
    setLoading(status: boolean) {
      this.loading = status;
    },
    setLoadingComplete(status: boolean) {
      this.loadingCompleted = status;
    },
    setNavScroll(top: number) {
      this.navScrollTop = top;
    },
    setLoadPage(index: number) {
      this.loadPage = index;
    },
  },
});

export default useBaseStore;
