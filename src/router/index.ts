import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/layout/Index.vue";
import IAIHome from "../views/IAIHome.vue";
import BaseNav from "../views/BaseNav.vue";
import ThreeJS from "../views/ThreeJS.vue";
import { ref } from "vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/nav",
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

router.beforeEach((to, from, next) => {
  document.body.scrollIntoView();
  return next();
});

let LOAD = ref(false);

const openLoad = (time = 0) => {
  if (!LOAD.value) {
    setTimeout(() => {
      LOAD.value = false;
    }, 250 + 270 + 1000 + 270 + 250 + time);
    LOAD.value = true;
  }
};

export { LOAD, openLoad };

export default router;
