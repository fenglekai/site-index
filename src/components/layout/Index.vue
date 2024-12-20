<script lang="ts" setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Aside from "./Aside.vue";

const MOBILE_WIDTH = 640;
const screenWidth = ref(document.body.clientWidth);
provide("screenWidth", screenWidth);
const notMobile = computed(() => {
  return screenWidth.value < MOBILE_WIDTH;
});
const collapse = ref(notMobile.value ? false : true);
const menuCollapse = ref(false);
const mainScroll = ref(0);
const headerHeight = computed(() => {
  if (notMobile.value || mainScroll.value > 0) {
    return "80px";
  } else {
    return "180px";
  }
});

const asideWidth = computed(() => {
  if (collapse.value) {
    return menuCollapse.value
      ? "calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)*2)"
      : "200px";
  } else {
    return "0px";
  }
});

const setCollapse = (value = !collapse.value) => {
  collapse.value = value;
};

watch(notMobile, (v) => {
  menuCollapse.value = false;
});

onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
      collapse.value = !notMobile.value;
    })();
  };
});
onUnmounted(() => {
  window.onresize = null;
});
</script>

<template>
  <el-container id="base-nav" class="min-h-screen relative text-slate-700">
    <el-header
      :style="[`min-height: ${headerHeight}; transition: 0.3s; padding: 0;`]"
      class="fixed border-b backdrop-blur-md z-10 w-full"
    >
      <Header
        :collapse="collapse"
        :not-mobile="notMobile"
        @setCollapse="setCollapse"
      />
    </el-header>
    <el-container
      :style="[
        `max-height: calc(100vh - ${headerHeight});margin-top: ${headerHeight}; transition: 0.3s;`,
      ]"
    >
      <!-- <el-aside
        class="duration-500 block fixed z-10 sm:static sm:z-none"
        style="transition: 0.3s"
        :width="asideWidth"
      >
        <Aside
          v-model:menu-collapse="menuCollapse"
          :headerHeight="headerHeight"
          :collapse="collapse"
          @setCollapse="setCollapse"
        />
      </el-aside> -->
      <el-container>
        <el-scrollbar
          wrap-class="main-scroll-wrap"
          @scroll="({ scrollTop }: any) => (mainScroll = scrollTop)"
        >
          <el-main style="overflow: visible;">
            <RouterView />
          </el-main>
          <el-footer class="text-gray-500"><Footer /></el-footer>
        </el-scrollbar>
        <el-backtop target=".main-scroll-wrap" :right="50" :bottom="50" />
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
#base-nav {
  max-width: 2560px;
  margin: 0 auto;
}
</style>
