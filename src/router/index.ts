import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../components/layout/Index.vue";
import Index from "../views/Index.vue";
import IAIHome from "../views/IAIHome.vue";
import BaseNav from "../views/BaseNav.vue";
import ThreeJS from "../views/ThreeJS.vue";
import { useBaseStore } from "../store/base";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/nav",
    component: Layout,
    children: [{ path: "/nav", component: BaseNav }],
  },
  {
    path: "/iai-home",
    component: IAIHome,
  },
  {
    path: "/demo",
    component: ThreeJS,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const waitCompleted = () => {
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

router.beforeEach(async (to, from, next) => {
  if (to.path == "/") {
    return next();
  }
  const baseStore = useBaseStore();
  baseStore.setLoading(true);
  await waitCompleted();
  return next();
});

router.afterEach(async () => {
  const baseStore = useBaseStore();
  baseStore.setLoading(false);
});

export default router;
