<script lang="ts" setup>
import { ref, watch } from "vue";
import { LOAD } from "../router";
watch(LOAD, (curVal) => {
  if (curVal) {
    textLoad();
  }
});

const textRef: any = ref(null);
// 270 + 1000 + 270
const textLoad = () => {
  const textChildren = textRef.value?.children;
  setTimeout(() => {
    // i = 9
    for (let i = 0; i < textChildren.length; i++) {
      setTimeout(() => {
        textChildren[i].style.opacity = 1;
        textChildren[i].style.transform = "scale(1) translateY(10px)";
      }, 30 * (i + 1));
    }
  }, 250);
  setTimeout(() => {
    // 270ms
    for (let i = 0; i < textChildren.length; i++) {
      setTimeout(() => {
        textChildren[i].style.opacity = 0;
        textChildren[i].style.transform = "scale(0) translateY(10px)";
      }, 30 * (i + 1));
    }
  }, 250 + 270 + 1000);
};
</script>

<template>
  <div
    id="load"
    class="w-screen h-screen fixed z-50 text-white text-5xl flex justify-center items-center"
  >
    <div
      id="start-load-wrapper"
      class="absolute w-full h-full flex justify-center items-center transition-all"
    ></div>
    <div
      ref="textRef"
      class="absolute w-full h-full flex justify-center items-center"
    >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >I</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >A</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >I</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >&nbsp;</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >D</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >e</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >p</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >t</span
      >
      <span
        class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"
        >.</span
      >
    </div>
  </div>
</template>

<style scoped>
#load {
  background-color: #fff;
  font-family: "Days One", "Arial Black", "Copperplate", sans-serif;
}
#start-load-wrapper {
  width: 0px;
  height: 0px;
  border-radius: 100%;
  background-color: #f26419;
  animation: load calc(250ms + 270ms + 1000ms + 270ms + 250ms)
    linear 1;
}
@keyframes load {
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    width: calc(100vw * 3);
    height: calc(100vw * 3);
    border-radius: 99%;
  }
  100% {
    width: 0px;
    height: 0px;
  }
}
</style>
