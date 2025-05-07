<script lang="ts" setup>
import {
  animate,
  utils,
  onScroll,
  createTimeline,
  stagger,
  AnimationParams,
} from "animejs";
import { useDark, useToggle } from '@vueuse/core'

onMounted(() => {
  lineAnimation();
});

const isDark = useDark({
  disableTransition: false
})
const toggleDark = useToggle(isDark)


const lineAnimation = () => {
  //-----------------------------------------timeline
  const staggerVisualizerEl = document.querySelector(".stagger-visualizer");
  const fragment = document.createDocumentFragment();
  const numberOfElements = 81;

  for (let i = 0; i < numberOfElements; i++) {
    fragment.appendChild(document.createElement("div"));
  }

  staggerVisualizerEl?.appendChild(fragment);

  const timeline = createTimeline({
    defaults: {
      ease: "easeInOutSine",
      delay: stagger(50),
      duration: 600,
      onComplete: (a) => console.log("end"),
    },
    autoplay: onScroll({
      target: ".stagger-visualizer-wrapper",
      sync: 0.99,
      enter: "center 55%",
      leave: "center 750lvh",
    }),
  });

  const keyframes: AnimationParams[] = [
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
    timeline.add(".stagger-visualizer div", frame);
  }
};
</script>

<template>
  <div class="scroll">
    <div class="stagger-visualizer-wrapper">
      <div class="stagger-visualizer"></div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<style>
.spacer {
  height: 800lvh;
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
}

.stagger-visualizer {
  display: flex;
  /*flex-wrap: wrap;*/
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 450px;
}

.stagger-visualizer div {
  /*position: absolute;*/
  width: 128px;
  height: 256px;
  background: linear-gradient(to bottom, #657585, #f3f4f6);
}
</style>
