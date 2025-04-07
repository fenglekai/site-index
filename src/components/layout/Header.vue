<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import LocalSearch from "../LocalSearch.vue";
import AnimateBanner from "../historyBanner/AnimateBanner.vue";
import Banner_20240527 from "../historyBanner/Banner_20240527.vue";

interface Props {
  mobileScreen: boolean;
  hiddenHeader: boolean;
}

interface Emits {
  (e: "showTour"): void;
}

const router = useRouter();

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const isDark = useDark({
  disableTransition: false
})
const toggleDark = useToggle(isDark)
const darkMode = ref(isDark.value)

watch(
  () => darkMode.value,
  () => {
    toggleDark()
  }
)


const bannerList = shallowRef<{ [key: string]: Component }>({
  default: AnimateBanner,
  "20240527": Banner_20240527,
});
const selectedBanner = computed(() => {
  if (darkMode.value) {
    return 'default'
  }
  return "20240527"
});

</script>

<template>
  <div v-if="!mobileScreen" class="absolute top-0 left-0 w-full h-full overflow-hidden">
    <Transition name="fade" mode="out-in">
      <component :is="bannerList[selectedBanner]" />
    </Transition>
  </div>
  <div class="w-full h-full flex sm:relative sm:block">
    <div class="header-wrapper text-gray-400 sm:text-white gap-2 px-5 sm:pt-4 sm:justify-start">
      <div id="logo" class="whitespace-nowrap tracking-wider" @click="emits('showTour')">
        <h2 class="inline-block header-text" @click="router.push('/')">
          <span>KAI</span>
          <span class="hidden sm:inline-block">站点导航</span>
        </h2>
      </div>

      <LocalSearch :hidden-header="hiddenHeader" class="min-w-0 grow" />

      <ul class="flex space-x-3 items-center">
        <li>
          <el-switch v-model="darkMode" :class="[darkMode ? 'dark-switch' : '']" style="--el-switch-on-color: #8e96aa55; --el-switch-off-color: #8e96aa55">
            <template #active-action>
              <el-icon class="dark-icon">
                <Moon />
              </el-icon>
            </template>
            <template #inactive-action>
              <el-icon class="light-icon">
                <Sunny />
              </el-icon>
            </template>
          </el-switch>
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

:deep(.dark-icon) {
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

:deep(.light-icon) {
  color: #606266;
}

:deep(.dark-switch .el-switch__action) {
  background-color: #141414;
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
