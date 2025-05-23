<script lang="ts" setup>
import { computed, onUnmounted, ref } from "vue";
import type { ScrollbarInstance } from "element-plus";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { mobileScreen } from "../../hook/use-mobile";
import { navLink } from "../../config/index";
import { useBaseStore } from '../../store/base'

onUnmounted(() => {
  window.onresize = null;
});

const baseStore = useBaseStore()

const mainScroll = ref(0);
const hiddenHeader = ref(false);
const mouseOnCategory = ref(false);
const headerHeight = computed(() => {
  if (hiddenHeader.value) {
    return 0;
  }
  if (mobileScreen.value) {
    return 60;
  }
  if (mainScroll.value > 0) {
    return 80;
  } else {
    return 180;
  }
});
const scrollRef = ref<ScrollbarInstance | null>(null);
const onScroll = ({ scrollTop }: { scrollTop: number }) => {
  if (
    scrollTop > mainScroll.value &&
    mainScroll.value > 600 &&
    !mouseOnCategory.value
  ) {
    hiddenHeader.value = true;
  }
  if (
    scrollTop < mainScroll.value &&
    mainScroll.value > 600 &&
    !mouseOnCategory.value
  ) {
    hiddenHeader.value = false;
  }
  mainScroll.value = scrollTop;
  baseStore.setNavScroll(scrollTop)
};
const handleEnterCategory = () => {
  mouseOnCategory.value = true;
};
const handleLeaveCategory = () => {
  mouseOnCategory.value = false;
};
</script>

<template>
  <div>
    <el-container
      id="base-nav"
      class="h-screen relative text-slate-700 overflow-hidden"
    >
      <el-header
        height="0px"
        :style="`min-height: ${headerHeight}px; transition: 0.3s; padding: 0; overflow: hidden;`"
        class="fixed backdrop-blur-md z-10 w-full"
      >
        <Header :mobile-screen="mobileScreen" :hiddenHeader="hiddenHeader" />
      </el-header>
      <el-container
        :style="[`margin-top: ${headerHeight}px; transition: 0.3s;`]"
      >
        <el-container>
          <el-header
            :style="`height: auto; min-height: 48px; overflow: hidden; transition: 0.3s; position: sticky; top: 0;`"
            @mouseenter="handleEnterCategory"
            @mouseleave="handleLeaveCategory"
          >
            <CategoryAnchor :nav-link="navLink"></CategoryAnchor>
          </el-header>
          <el-scrollbar
            ref="scrollRef"
            :height="`calc(100vh - 48px)`"
            wrap-class="main-scroll-wrap"
            @scroll="onScroll"
          >
            <el-main
              id="main"
              :style="{
                overflow: 'visible',
                padding: mobileScreen ? '6px' : '',
              }"
            >
              <RouterView />
            </el-main>
            <el-footer class="kai-text">
              <Footer />
            </el-footer>
          </el-scrollbar>
        </el-container>
      </el-container>
      <el-backtop target=".main-scroll-wrap" :right="50" :bottom="50" />
    </el-container>
  </div>
</template>

<style scoped>
#base-nav {
  max-width: 2560px;
  margin: 0 auto;
}
</style>
