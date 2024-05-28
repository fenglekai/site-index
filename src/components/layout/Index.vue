<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef,
} from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Aside from "./Aside.vue";
import ThreeJS from "../../views/ThreeJS.vue";

const MOBILE_WIDTH = 640;
const screenWidth = ref(document.body.clientWidth);
provide("screenWidth", screenWidth);
const collapse = ref(screenWidth.value < MOBILE_WIDTH ? false : true);
const mainScroll = ref(0);
const headerHeight = computed(() => {
  if (screenWidth.value < MOBILE_WIDTH || mainScroll.value > 0) {
    return "80px";
  } else {
    return "180px";
  }
});

const asideWidth = computed(() => {
  if (collapse.value) {
    return "200px";
  } else if (screenWidth.value >= MOBILE_WIDTH) {
    return "calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)*2)";
  } else {
    return "0px";
  }
});

onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
    })();
  };
});
onUnmounted(() => {
  window.onresize = null;
});

const setCollapse = () => {
  collapse.value = !collapse.value;
};

const darkBackground = ref(false);
const darkSwitch = () => {
  darkBackground.value = !darkBackground.value;
};
provide("darkBackground", darkBackground);
</script>

<template>
  <el-container id="base-nav" class="min-h-screen relative">
    <div
      v-if="darkBackground"
      class="absolute top-0 left-0 w-full h-full"
      style="z-index: 0"
    >
      <ThreeJS :show-list="false" />
    </div>
    <el-header
      :style="[`min-height: ${headerHeight}; transition: 0.3s; padding: 0;`]"
      class="fixed border-b backdrop-blur-md z-10 w-full"
    >
      <Header
        :collapse="collapse"
        :is-mobile="screenWidth <= MOBILE_WIDTH"
        :dark-background="darkBackground"
        @setCollapse="setCollapse"
      />
    </el-header>
    <el-container
      :style="[
        `max-height: calc(100vh - ${headerHeight});margin-top: ${headerHeight}; transition: 0.3s;`,
      ]"
    >
      <el-aside
        class="duration-500 block fixed z-10 sm:static sm:z-none"
        style="transition: 0.3s"
        :width="asideWidth"
      >
        <Aside
          :headerHeight="headerHeight"
          :dark="darkBackground"
          :collapse="collapse"
          @darkSwitch="darkSwitch"
          @setCollapse="setCollapse"
        />
      </el-aside>
      <el-container>
        <el-scrollbar
          class="w-full"
          wrap-class="main-scroll-wrap"
          @scroll="({ scrollTop }: any) => (mainScroll = scrollTop)"
        >
          <el-main
            class="w-full p-0"
            @click="
              () => {
                if (headerHeight == '80px' && collapse) setCollapse();
              }
            "
          >
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
