<script setup lang="ts">
import { useDark } from '@vueuse/core';
import LoadPage from './components/LoadPage.vue';
import useBaseStore from './store/base';

const baseStore = useBaseStore()

const loading = computed(() => baseStore.isLoading)

const isDark = useDark({
  disableTransition: false
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
  <LoadPage></LoadPage>
</template>

<style scoped></style>
