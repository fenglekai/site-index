import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../components/layout/Index.vue";
import Index from "../views/Index.vue";
import IAIHome from "../views/IAIHome.vue";
import BaseNav from "../views/BaseNav.vue";
import ThreeJS from "../views/ThreeJS.vue";
import { useBaseStore } from "../store/base";
import { includeRoute, waitCompleted } from "../hook/use-load-page";

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
    path: "/threejs",
    component: ThreeJS,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 遍历需要loading页面的路由
  // 在页面调用useLoadPage
  for (let i = 0; i < includeRoute.length; i++) {
    const route = includeRoute[i];
    if (to.path == route) {
      const baseStore = useBaseStore();
      baseStore.setLoading(true);
      await waitCompleted();
      return next();
    }
  }
  return next();
});

export default router;
