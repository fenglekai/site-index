<script lang="ts" setup>
import { useRouter } from "vue-router";
import { navLink } from "../../config/index";
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

const handleNavClick = (key: string = "home") => {
  let doc: Document | any = document;
  doc.querySelector(`#${key}`).scrollIntoView({ behavior: "smooth" });
  setNav();
};

const showNav = ref(false);
const setNav = () => {
  showNav.value = !showNav.value;
};
</script>

<template>
  <div class="w-full h-full flex sm:relative sm:block">
    <div class="header-wrapper gap-2 sm:pt-4 sm:justify-start">
      <div
        class="hidden sm:flex items-center cursor-pointer transition-all hover:text-yellow-400"
        @click="emits('setCollapse')"
      >
        <el-icon size="20" v-show="!props.collapse"><Expand /></el-icon>
        <el-icon size="20" v-show="props.collapse"><Fold /></el-icon>
      </div>
      <div
        id="logo"
        class="whitespace-nowrap grow tracking-wider sm:absolute sm:top-1/2 sm:transform sm:-translate-y-1/2"
      >
        <div
          class="sm:hidden inline-block transition-all mr-2"
          @click="emits('setCollapse')"
        >
          <el-icon size="20"><Operation /></el-icon>
        </div>
        <h2 class="inline-block header-text" @click="handleClick">
          <span>KAI</span>
          <span class="hidden sm:inline-block">站点导航</span>
        </h2>
      </div>
      <LocalSearch class="min-w-0 shrink sm:grow" />
    </div>
    <div
      :class="[
        'block sm:hidden absolute top-full left-0 bg-wrapper w-screen z-30 transition-all duration overflow-hidden',
        showNav ? 'max-h-screen' : 'max-h-0',
      ]"
    >
      <template v-for="item in navLink">
        <p
          class="text-center text-white mb-2"
          @click="handleNavClick(item.navTitle)"
        >
          {{ item.navTitle }}
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  color: #fff;
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
.bg-wrapper {
  background-color: #545c64;
}
</style>
