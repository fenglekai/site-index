<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import {
  animate,
  utils,
  onScroll,
  createTimeline,
  stagger,
  AnimationParams,
  Timeline,
} from "animejs";

import { Sunny, Moon } from "@element-plus/icons-vue";
import personSite from "../config/person-site";
import { NavLinkItemChild } from "../config";

onMounted(() => {
  lineAnimation();
  landingBgAnimation();
});
onUnmounted(() => {
  timeline.value && utils.remove(timeline.value);
});

const isDark = useDark({
  disableTransition: false,
});
const toggleDark = useToggle(isDark);

const timeline = ref<Timeline>();
const lineAnimation = () => {
  //-----------------------------------------timeline
  const staggerVisualizerEl = document.querySelector(".stagger-visualizer");
  const fragment = document.createDocumentFragment();
  const numberOfElements = 81;

  for (let i = 0; i < numberOfElements; i++) {
    fragment.appendChild(document.createElement("div"));
  }

  staggerVisualizerEl?.appendChild(fragment);

  timeline.value = createTimeline({
    defaults: {
      ease: "easeInOutSine",
      delay: stagger(50),
      duration: 600,
      onComplete: (a) => console.log("end"),
    },
    autoplay: onScroll({
      target: ".stagger-visualizer-wrapper",
      sync: 0.99,
      enter: "center 55vh",
      leave: "center 750lvh",
      // debug: true,
    }),
  });

  const keyframes: AnimationParams[] = [
    {
      opacity: 1,
      delay: stagger(1, { from: "center" }),
    },
    {
      scale: stagger([2.5, 1], { from: "center", grid: [9, 9] }),
      translateX: stagger([-100, 100]),
      rotate: stagger([-45, 45]),
      ease: "easeInOutCirc",
      delay: stagger(10, { from: "center" }),
    },
    {
      scale: stagger([2.5, 1], { from: "center", ease: "easeInOutCirc" }),
      translateX: stagger([-200, 200]),
      translateY: stagger([-200, 200]),
      rotate: 0,
      delay: stagger(1, { from: "last" }),
    },
    {
      rotate: stagger(2, {
        from: "center",
        reversed: true,
        ease: "easeInSine",
      }),
      translateX: 0,
      translateY: 0,
      delay: stagger(10, { from: "center" }),
    },
    {
      scale: stagger([2, 1], { grid: [9, 9], axis: "y" }),
      translateY: stagger([-100, 200], { grid: [9, 9], axis: "y" }),
      rotate: 0,
      delay: stagger(1, { from: "last" }),
    },
    {
      translateX: () => utils.random(-100, 100),
      translateY: () => utils.random(-100, 100),
      scale: stagger([1.5, 0.5], { from: "center" }),
      rotate: stagger([10, -10], { from: "last" }),
      delay: stagger(50, { from: "center", grid: [9, 9] }),
    },
    {
      translateX: () => utils.random(-100, 100),
      translateY: () => utils.random(-100, 100),
      rotate: stagger([-10, 10], { from: "last" }),
      scale: 1,
      delay: stagger(50, { from: "center", grid: [9, 9] }),
    },
    {
      translateX: 0,
      translateY: stagger(6, { from: "center", reversed: true }),
      rotate: 0,
      delay: stagger(50, { from: "center", grid: [9, 9] }),
    },
    {
      translateX: stagger("1rem", { grid: [9, 9], from: "center", axis: "x" }),
      delay: stagger(200, { grid: [9, 9], from: "center", reversed: true }),
    },
    {
      translateX: stagger([25, -25], { from: "first" }),
      translateY: 0,
      rotate: stagger([40, -40], { from: "first" }),
      delay: stagger(10, { from: "first" }),
    },
    {
      translateY: stagger([-240, 240]),
      rotate: () => utils.random(-100, 100),
      scale: stagger([1, 3], { from: "center" }),
      delay: stagger(10, { from: 0 }),
    },
    {
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotate: 360,
      duration: 2000,
      delay: 0,
    },
  ];

  for (let i = 0; i < keyframes.length; i++) {
    const frame = keyframes[i];
    timeline.value.add(".stagger-visualizer div", frame);
  }
};

const landingBgAnimation = () => {
  animate(".landing-bg", {
    width: ["100vw", "450px"],
    height: ["100vh", "256px"],
    filter: ["blur(300px)", "blur(0px)"],
    opacity: ["1", "0"],
    ease: "linear",
    autoplay: onScroll({
      sync: 0.99,
      enter: "center center",
      leave: "center 55vh",
    }),
  });
  animate(".stagger-visualizer-wrapper", {
    filter: ["blur(100px)", "blur(0px)"],
    ease: "linear",
    autoplay: onScroll({
      sync: 0.99,
      enter: "center center",
      leave: "center 55vh",
    }),
  });
};

const handleCard = (site: NavLinkItemChild) => {
  site.onClick ? site.onClick() : window.open(site.url);
};
</script>

<template>
  <div class="scroll">
    <div
      class="w-screen h-screen flex justify-center items-center fixed top-0 left-0"
    >
      <div class="landing-bg"></div>
    </div>
    <div class="stagger-visualizer-wrapper">
      <div class="stagger-visualizer"></div>
    </div>

    <!-- container -->
    <div class="spacer">
      <h2 class="text-center text-4xl font-bold mb-12">KAI的实验室</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <template v-for="item in personSite.children">
          <GlowCard
            staticIcon
            class="leading-6 text-base text-gray-700 backdrop-blur-md"
            :data="item"
            @click="handleCard"
          />
        </template>
      </div>
    </div>
    <div class="fixed right-2 bottom-2 z-[3]">
      <button class="kai-text theme-btn" @click="() => toggleDark()">
        <Sunny style="width: 1em; height: 1em" />
      </button>
    </div>
    <el-backtop target=".scroll" :right="50" :bottom="50" />
  </div>
</template>

<style scoped>
.spacer {
  position: relative;
  height: 800lvh;
  z-index: 2;
  font-family: "Days One", "Arial Black", "Copperplate", sans-serif;
  padding: 2em;
}

.landing-bg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    -45deg,
    var(--kai-c-brand-1) 30%,
    var(--kai-c-brand-next)
  );
}

.stagger-visualizer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.stagger-visualizer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 450px;
}

:deep(.stagger-visualizer div) {
  width: 64px;
  height: 256px;
  background: linear-gradient(
    -45deg,
    var(--kai-c-brand-1) 30%,
    var(--kai-c-brand-next)
  );
  opacity: 0;
}

.theme-btn {
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--kai-bg);
  transition: 0.3s background linear;
}
.theme-btn:hover {
  background-color: var(--kai-c-bg-hover);
}

.kai-card-bg {
  background-color: var(--kai-c-bg);
}
.kai-card-bg:hover {
  background-color: var(--kai-c-bg);
}
</style>
