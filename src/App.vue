<script setup lang="ts">
import LoadPage from "./views/LoadPage.vue";
import { LOAD } from "./router/index";
</script>

<template>
  <div v-show="!LOAD" class="animate-[slide-down-fade_0.3s_ease-in-out]">
    <RouterView
    />
  </div>
  <LoadPage v-show="LOAD" class="animate-[slide-down-fade_0.3s_ease-in-out]" />
</template>

<style scoped></style>
