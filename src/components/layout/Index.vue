<script lang="ts" setup>
import { onMounted, onUnmounted, provide, ref } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Aside from "./Aside.vue";
import ThreeJS from "../../views/ThreeJS.vue";
import AnimateBanner from "../AnimateBanner.vue";

const screenWidth = ref(document.body.clientWidth);
const mobileHeightScreen = ref("180px");
onMounted(() => {
  if (screenWidth.value < 640) {
    mobileHeightScreen.value = "80px";
  } else {
    mobileHeightScreen.value = "180px";
  }
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
      if (document.body.clientWidth < 640) {
        mobileHeightScreen.value = "80px";
      } else {
        mobileHeightScreen.value = "180px";
      }
    })();
  };
});
onUnmounted(() => {
  window.onresize = null;
});

const collapse = ref(true);
const asideWidth = ref("200px");
const setCollapse = () => {
  if (collapse.value) {
    asideWidth.value = "0px";
  } else {
    asideWidth.value = "200px";
  }
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
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden hidden sm:block">
        <AnimateBanner v-show="!darkBackground" />
      </div>
      <Header :collapse="collapse" @setCollapse="setCollapse" />
    </el-header>
    <el-container
      :style="`max-height: calc(100vh - ${mobileHeightScreen})`"
      class="bg-gray-100"
    >
      <el-aside
        class="transition-all duration-500 hidden sm:block"
        :width="asideWidth"
      >
        <el-scrollbar>
          <Aside
            :style="
              darkBackground
                ? 'background-color: transparent;'
                : 'background-color: #545c64;'
            "
            @darkSwitch="darkSwitch"
          />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-scrollbar class="w-full" wrap-class="main-scroll-wrap">
          <el-main class="w-full p-0">
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
