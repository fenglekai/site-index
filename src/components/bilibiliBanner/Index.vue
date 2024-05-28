<script lang="ts">
import { ref } from "vue";
import { Layout } from "./types";
</script>
<script lang="ts" setup>
const props = defineProps<{
  layout: Array<Layout>;
}>();

const bannerWrapper: any = ref(null);
const animated: any = ref(null);
const startX = ref(0);
const useStart = ref(false);
const layerList = ref(props.layout || []);
const STEP = 120;

const nodeTransformList = computed(() => {
  const result: any = [];
  for (let i = 0; i < animated.value.children.length; i++) {
    result.push(animated.value.children[i].children[0].style.transform);
  }
  return result;
});

const getTranslateXY = (item: any) => {
  return item
    .replace(/[^0-9\-.,]/g, "")
    .slice(0, -2)
    .split(",")
    .map((item: string) => {
      return Number(item);
    });
};

const transitionLabel = (
  key: number,
  translateX: number,
  translateY: number = 0
) => {
  const splitTransform = getTranslateXY(nodeTransformList.value[key]);
  return `translate(${splitTransform[0] + translateX}px , ${
    splitTransform[1] + translateY
  }px) rotate(0deg) scale(1)`;
};

const translateReset = (data: Layout) => {
  const { key, translateXPower, translateYPower } = data;
  const img = animated.value?.children[key].children[0];
  if (img) {
    const defaultValue = getTranslateXY(nodeTransformList.value[key]);
    const currentValue = getTranslateXY(img.style.transform);
    let countX = translateXPower
      ? Math.abs(currentValue[0] - defaultValue[0]) / Math.abs(translateXPower)
      : 0;
    let countY = translateYPower
      ? Math.abs(currentValue[1] - defaultValue[1]) / Math.abs(translateYPower)
      : 0;

    const frame = requestAnimationFrame(loop);
    function loop() {
      if (countX + countY === 0) {
        cancelAnimationFrame(frame);
        return;
      }
      
      countX = Math.max(countX - STEP, 0);
      countY = Math.max(countY - STEP, 0);
      let x = translateXPower ? Math.abs(translateXPower) : 0;
      let y = translateYPower ? Math.abs(translateYPower) : 0;

      if (currentValue[0] > defaultValue[0]) {
        x *= countX;
      } else {
        x *= -countX;
      }
      if (currentValue[1] > defaultValue[1]) {
        y *= countY;
      } else {
        y *= -countY;
      }

      img.style.transform = transitionLabel(key, x, y);
      requestAnimationFrame(loop);
    }
  }
};

const getRotate = (transform: any) => {
  return Number(
    transform
      .replace(/[^0-9\-.)]/g, "")
      .slice(0, -1)
      .split(")")
      .slice(1, 2)[0]
  );
};

const rotateLabel = (key: number, rotate: number) => {
  const defaultTranslate = getTranslateXY(nodeTransformList.value[key]);
  const defaultRotate = getRotate(nodeTransformList.value[key]);
  return `translate(${defaultTranslate[0]}px , ${
    defaultTranslate[1]
  }px) rotate(${defaultRotate + rotate}deg) scale(1)`;
};

const rotateReset = (data: { key: number; rotatePower?: number }) => {
  const { key, rotatePower } = data;
  const img = animated.value?.children[key].children[0];
  if (rotatePower && img) {
    const defaultRotate = getRotate(nodeTransformList.value[key]);
    const currentRotate = getRotate(img.style.transform);
    let count = Math.abs(currentRotate - defaultRotate) / rotatePower;
    const frame = requestAnimationFrame(loop);
    function loop() {
      if (count <= 0 || !rotatePower) {
        cancelAnimationFrame(frame);
        return;
      }
      count = Math.max(count - STEP, 0);
      if (currentRotate > defaultRotate) {
        img.style.transform = rotateLabel(key, rotatePower * count);
      } else {
        img.style.transform = rotateLabel(key, -rotatePower * count);
      }
      requestAnimationFrame(loop);
    }
  }
};

const resetTransform = () => {
  layerList.value.forEach((item) => {
    translateReset(item);
    rotateReset(item);
  });
};

const useMousemove = (e: any) => {
  if (e.y < bannerWrapper.value.clientHeight) {
    if (!useStart.value) {
      startX.value = e.x;
      useStart.value = true;
    }

    const translateXNum = -(startX.value - e.x);

    layerList.value.forEach((item) => {
      const {
        key,
        translateXPower,
        translateYPower,
        disableTranslateX,
        rotatePower,
      } = item;
      const img = animated.value.children[key].children[0];
      if (translateXPower && img) {
        const x = !disableTranslateX ? translateXNum * translateXPower : 0;
        const y = translateYPower ? translateXNum * translateYPower : 0;
        img.style.transform = transitionLabel(key, x, y);
      }
      if (rotatePower && img) {
        const splitTransform = getTranslateXY(nodeTransformList.value[3]);
        img.style.transform = `translate(${splitTransform[0]}px , ${
          splitTransform[1]
        }px) rotate(${-translateXNum * rotatePower}deg) scale(1)`;
      }
    });
  } else {
    useStart.value = false;

    resetTransform();
  }
};

const useMouseleave = (e: any) => {
  useStart.value = false;
  resetTransform();
};

onMounted(() => {
  document.body.addEventListener("mousemove", useMousemove);
  document.body.addEventListener("mouseleave", useMouseleave);
});
onUnmounted(() => {
  document.body.removeEventListener("mousemove", useMousemove);
  document.body.removeEventListener("mouseleave", useMouseleave);
});
</script>

<template>
  <div class="bili-header">
    <div class="bili-header__banner">
      <div ref="animated" class="animated-banner">
        <slot></slot>
      </div>
      <div ref="bannerWrapper" class="relative w-full h-full"></div>
    </div>
  </div>
</template>

<style>
.bili-header .bili-header__banner {
  position: relative;
  z-index: 0;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  min-width: 1000px;
  min-height: 155px;
  height: 180px;
  max-height: 240px;
  background-color: #e3e5e7;
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
}
.bili-header .animated-banner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.bili-header .animated-banner > .layer {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
