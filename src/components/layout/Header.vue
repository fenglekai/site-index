<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import LocalSearch from "../LocalSearch.vue";

const router = useRouter();
const handleClick = () => {
  router.push("/home");
};

const props = defineProps({
  collapse: Boolean,
});
const emits = defineEmits(["setCollapse"]);

const showNav = ref(false);
const setNav = () => {
  showNav.value = !showNav.value;
};
</script>

<template>
  <div class="w-full h-full flex sm:relative sm:block">
    <div class="header-wrapper text-gray-400 sm:text-white gap-2 sm:pt-4 sm:justify-start">
      <div
        id="logo"
        class="whitespace-nowrap tracking-wider"
      >
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
</style>
