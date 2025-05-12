import { onMounted } from "vue";
import { useBaseStore } from "../store/base";

export const includeRoute = ['/threejs','/iai-home']

export const waitCompleted = () => {
  return new Promise((resolve) => {
    const baseStore = useBaseStore();
    const loop = () => {
      if (baseStore.isCompleted) {
        baseStore.setLoadingComplete(false);
        resolve(true);
      } else {
        requestAnimationFrame(loop);
      }
    };
    requestAnimationFrame(loop);
  });
};

export function useLoadPage() {
  onMounted(() => {
    setTimeout(() => {
      const baseStore = useBaseStore();
      baseStore.setLoading(false);
    }, 200);
  });
}
