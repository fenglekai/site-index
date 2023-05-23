<script setup lang="ts">
import LoadPage from "./views/LoadPage.vue";
import { LOAD } from "./router/index";
</script>

<template>
  <RouterView
    v-show="!LOAD"
    class="animate-[slide-down-fade_0.3s_ease-in-out]"
  />
  <LoadPage v-show="LOAD" class="animate-[slide-down-fade_0.3s_ease-in-out]" />
</template>

<style scoped></style>
