<script lang="ts" setup>
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Aside from "./Aside.vue";
import ThreeJS from "../../views/ThreeJS.vue";
import AnimateBanner from "../AnimateBanner.vue";

const screenWidth = ref(document.body.clientWidth);
provide("screenWidth", screenWidth);
const mobileHeightScreen = ref("180px");
onMounted(() => {
  if (screenWidth.value < 640) {
    mobileHeightScreen.value = "80px";
    collapse.value = false;
  } else {
    mobileHeightScreen.value = "180px";
    collapse.value = true;
  }
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
      if (document.body.clientWidth < 640) {
        mobileHeightScreen.value = "80px";
        collapse.value = false;
      } else {
        mobileHeightScreen.value = "180px";
        collapse.value = true;
      }
    })();
  };
});
onUnmounted(() => {
  window.onresize = null;
});

const collapse = ref(true);
const asideWidth = computed(() => {
  if (collapse.value) {
    return "200px";
  } else {
    return "0px";
  }
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
      :height="mobileHeightScreen"
      class="relative px-0 shadow-lg"
      :style="darkBackground ? 'background-color: transparent;' : ''"
    >
      <div
        class="absolute top-0 left-0 w-full h-full overflow-hidden hidden sm:block"
      >
        <AnimateBanner v-show="!darkBackground" />
      </div>
      <Header :collapse="collapse" @setCollapse="setCollapse" />
    </el-header>
    <el-container :style="`max-height: calc(100vh - ${mobileHeightScreen})`">
      <el-aside
        class="transition-all duration-500 block fixed z-10 sm:static sm:z-none"
        :width="asideWidth"
      >
        <el-scrollbar>
          <Aside
            :mobileHeightScreen="mobileHeightScreen"
            :dark="darkBackground"
            @darkSwitch="darkSwitch"
          />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-scrollbar class="w-full" wrap-class="main-scroll-wrap">
          <el-main
            class="w-full p-0"
            @click="
              () => {
                if (mobileHeightScreen == '80px' && collapse) setCollapse();
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
.el-header {
  background-color: #545c64;
}
#base-nav {
  max-width: 2560px;
  margin: 0 auto;
}
</style>
