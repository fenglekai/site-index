<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import LocalSearch from "../LocalSearch.vue";
import AnimateBanner from "../historyBanner/AnimateBanner.vue";
import Banner_20240527 from "../historyBanner/Banner_20240527.vue";

interface Props {
  collapse: boolean;
  notMobile: boolean;
}

interface Emits {
  (e: "setCollapse"): void;
  (e: "showTour"): void;
}

const router = useRouter();

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const bannerList = shallowRef<{ [key: string]: Component }>({
  default: AnimateBanner,
  "20240527": Banner_20240527,
});
const selectedBanner = ref("20240527");
const selectOptions = computed(() => {
  return Object.keys(bannerList.value);
});
</script>

<template>
  <div
    v-if="!notMobile"
    class="absolute top-0 left-0 w-full h-full overflow-hidden"
  >
    <Transition name="fade" mode="out-in">
      <component :is="bannerList[selectedBanner]" />
    </Transition>
  </div>
  <div class="w-full h-full flex sm:relative sm:block">
    <div
      class="header-wrapper text-gray-400 sm:text-white gap-2 px-5 sm:pt-4 sm:justify-start"
    >
      <div id="logo" class="whitespace-nowrap tracking-wider" @click="emits('showTour')">
        <!-- <div
          class="sm:hidden inline-block transition-all mr-2"
          @click="emits('setCollapse')"
        >
          <el-icon size="20"><IEpOperation /></el-icon>
        </div> -->
        <h2 class="inline-block header-text" @click="router.push('/')">
          <span>KAI</span>
          <span class="hidden sm:inline-block">站点导航</span>
        </h2>
      </div>

      <LocalSearch id="search-input" class="min-w-0 grow" />

      <ul class="hidden md:flex space-x-3 items-center">
        <li></li>
        <li class="flex items-center">
          <el-dropdown v-if="!notMobile" @command="selectedBanner = $event">
            <span class="text-white" style="outline: none"> 切换Banner </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in selectOptions"
                  :command="item"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

@media (min-width: 640px) {
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
  }
}
</style>
