import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../components/layout/Index.vue";
import Index from "../views/Index.vue";
import IAIHome from "../views/IAIHome.vue";
import BaseNav from "../views/BaseNav.vue";
import ThreeJS from "../views/ThreeJS.vue";
import { useBaseStore } from "../store/base";
import { useLoadPage, waitCompleted } from "../hook/use-load-page";

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

router.beforeEach(async (to, from, next) => {
  if (to.path == "/") {
    return next();
  }
  const baseStore = useBaseStore();
  baseStore.setLoading(true);
  await waitCompleted();
  return next();
});

export default router;
