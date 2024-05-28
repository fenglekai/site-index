<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import LocalSearch from "../LocalSearch.vue";
import AnimateBanner from "../historyBanner/AnimateBanner.vue";
import Banner_20240527 from "../historyBanner/Banner_20240527.vue";

interface Props {
  collapse: boolean;
  isMobile: boolean;
  darkBackground: boolean;
}

const router = useRouter();
const handleClick = () => {
  router.push("/home");
};

const props = defineProps<Props>();
const emits = defineEmits(["setCollapse"]);

const showNav = ref(false);
const setNav = () => {
  showNav.value = !showNav.value;
};

const bannerList = shallowRef<{ [key: string]: Component }>({
  "默认": AnimateBanner,
  "20240527": Banner_20240527,
});
const selectedBanner = ref("20240527");
const selectOptions = computed(() => {
  return Object.keys(bannerList.value);
});
</script>

<template>
  <div
    v-if="isMobile || !darkBackground"
    class="absolute top-0 left-0 w-full h-full overflow-hidden"
  >
    <Transition>
      <component :is="bannerList[selectedBanner]" />
    </Transition>
  </div>
  <div class="w-full h-full flex sm:relative sm:block">
    <div
      class="header-wrapper text-gray-400 sm:text-white gap-2 px-5 sm:pt-4 sm:justify-start"
    >
      <div id="logo" class="whitespace-nowrap tracking-wider">
        <div
          class="sm:hidden inline-block transition-all mr-2"
          @click="emits('setCollapse')"
        >
          <el-icon size="20"><IEpOperation /></el-icon>
        </div>
        <h2 class="inline-block header-text" @click="handleClick">
          <span>KAI</span>
          <span class="hidden sm:inline-block">站点导航</span>
        </h2>
      </div>

      <LocalSearch class="min-w-0 grow" />

      <el-dropdown @command="selectedBanner = $event">
        <span class="text-white" style="outline: none;"> 切换Banner </span>
        <template #dropdown>
          <el-dropdown-menu>

            <el-dropdown-item v-for="item in selectOptions" :command="item">{{ item }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
}

#logo {
  font-family: "Days One", "Arial Black", "Copperplate", sans-serif;
}
.header-text {
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
}
.header-text:hover {
  color: #ffd04b;
}
</style>