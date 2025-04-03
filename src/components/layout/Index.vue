<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { ScrollbarInstance } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { mobileScreen } from "../../hook/use-mobile";
import { navLink } from "../../config/index";

const mainScroll = ref(0);
const hiddenHeader = ref(false)
const mouseOnCategory = ref(false)
const headerHeight = computed(() => {
  if (hiddenHeader.value) {
    return 0
  }
  if (mobileScreen.value) {
    return 60
  }
  if (mainScroll.value > 0) {
    return 80;
  } else {
    return 180;
  }
});
const scrollRef = ref<ScrollbarInstance | null>(null)
const onScroll = ({ scrollTop }: { scrollTop: number }) => {
  if (scrollTop > mainScroll.value && mainScroll.value > 600 && !mouseOnCategory.value) {
    hiddenHeader.value = true
  }
  if (scrollTop < mainScroll.value && mainScroll.value > 600 && !mouseOnCategory.value) {
    hiddenHeader.value = false
  }
  mainScroll.value = scrollTop
}
const handleEnterCategory = () => {
  mouseOnCategory.value = true
}
const handleLeaveCategory = () => {
  mouseOnCategory.value = false
}

const showTour = ref(false)
const handleTourFinish = () => {
  localStorage.setItem("base-nav-tour", '1');
}

onMounted(() => {
  const baseNavTour = localStorage.getItem("base-nav-tour");
  if (!baseNavTour) {
    showTour.value = true
  }
});
onUnmounted(() => {
  window.onresize = null;
});
</script>

<template>
  <el-container id="base-nav" class="min-h-screen relative text-slate-700">
    <el-header height="0px" :style="`min-height: ${headerHeight}px; transition: 0.3s; padding: 0; overflow: hidden;`"
      class="fixed backdrop-blur-md z-10 w-full">
        <Header :mobile-screen="mobileScreen" :hiddenHeader="hiddenHeader" @show-tour="showTour = true" />
    </el-header>
    <el-container :style="[
      `margin-top: ${headerHeight}px; transition: 0.3s;`,
    ]">
      <el-container>
        <el-header :style="`height: auto; min-height: 48px; overflow: hidden; transition: 0.3s; position: sticky; top: 0;`"
          @mouseenter="handleEnterCategory" @mouseleave="handleLeaveCategory">
          <CategoryAnchor :nav-link="navLink"></CategoryAnchor>
        </el-header>
        <el-scrollbar ref="scrollRef" :height="`calc(100vh - 48px - ${headerHeight}px)`" wrap-class="main-scroll-wrap" @scroll="onScroll">
          <el-main id="main" :style="{ overflow: 'visible', padding: mobileScreen ? '6px' : '' }">
            <RouterView />
          </el-main>
          <el-footer class="text-gray-500">
            <Footer />
          </el-footer>
        </el-scrollbar>
      </el-container>
    </el-container>
    <el-backtop target=".main-scroll-wrap" :right="50" :bottom="50" />
  </el-container>
  <el-tour v-model="showTour" :content-style="{ width: '300px' }" class="text-gray-500" @close="handleTourFinish"
    @finish="handleTourFinish">
    <el-tour-step :next-button-props="{ children: '下一步' }" target="#search-input" title="搜索" description="输入框搜索链接" />
    <el-tour-step :prev-button-props="{ children: '上一步' }" :next-button-props="{ children: '下一步' }" target="#save"
      title="保存" description="保存添加的链接到本地" />
    <el-tour-step :prev-button-props="{ children: '上一步' }" :next-button-props="{ children: '下一步' }" target="#load"
      title="上传" description="上传导入之前的链接" />
    <el-tour-step :prev-button-props="{ children: '上一步' }" :next-button-props="{ children: '下一步' }"
      target="#add-own-link" title="新增链接" description="手动新增一个链接" />
    <el-tour-step :prev-button-props="{ children: '上一步' }" :next-button-props="{ children: '下一步' }" title="操作卡片">
      <p class="mb-1">电脑右键卡片打开下拉菜单</p>
      <p>手机在卡片上向左滑动显示操作按钮，再次向左滑动隐藏操作按钮</p>
    </el-tour-step>
    <el-tour-step :prev-button-props="{ children: '上一步' }" :next-button-props="{ children: '结束' }" target="#logo"
      title="提示" description="这里可以再次打开引导提示" />
  </el-tour>
</template>

<style scoped>
#base-nav {
  max-width: 2560px;
  margin: 0 auto;
}
</style>
