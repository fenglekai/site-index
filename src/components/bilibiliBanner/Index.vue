<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  layout: Array<{ key: number; translatePower?: number; rotatePower?: number }>;
}>();

const bannerWrapper: any = ref(null);
const animated: any = ref(null);
const startX = ref(0);
const useStart = ref(false);
const layerList = ref(props.layout || []);

const nodeTransformList = computed(() => {
  const result: any = [];
  for (let i = 0; i < animated.value.children.length; i++) {
    result.push(animated.value.children[i].children[0].style.transform);
  }
  console.log(result);
  
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

const transitionXLabel = (key: number, translateX: number) => {
  const splitTransform = getTranslateXY(nodeTransformList.value[key]);
  return `translate(${splitTransform[0] + translateX}px , ${
    splitTransform[1]
  }px) rotate(0deg) scale(1)`;
};

const translateReset = (data: { key: number; translatePower?: number }) => {
  const { key, translatePower } = data;
  const img = animated.value.children[key].children[0];
  const defaultX = getTranslateXY(nodeTransformList.value[key])[0];
  const currentX = getTranslateXY(img.style.transform)[0];
  const STEP = 150;
  if (translatePower && img) {
    let count = Math.abs(currentX - defaultX) / translatePower;
    if (count < STEP) {
      return;
    }
    const frame = requestAnimationFrame(loop);
    function loop() {
      if (count < 0 || !translatePower) {
        cancelAnimationFrame(frame);
        return;
      }
      count -= STEP;
      if (currentX > defaultX) {
        img.style.transform = transitionXLabel(key, translatePower * count);
      } else {
        img.style.transform = transitionXLabel(key, -translatePower * count);
      }
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
  const img = animated.value.children[key].children[0];
  if (rotatePower && img) {
    const defaultRotate = getRotate(nodeTransformList.value[key]);
    const currentRotate = getRotate(img.style.transform);
    const STEP = 150;
    let count = Math.abs(currentRotate - defaultRotate) / rotatePower;
    if (count < STEP) {
      return;
    }
    const frame = requestAnimationFrame(loop);
    function loop() {
      if (count < 0 || !rotatePower) {
        cancelAnimationFrame(frame);
        img.style.transform = rotateLabel(key, defaultRotate);
        return;
      }
      count -= STEP;
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
      const { key, translatePower, rotatePower } = item;
      const img = animated.value.children[key].children[0];
      if (translatePower && img) {
        img.style.transform = transitionXLabel(
          key,
          translateXNum * translatePower
        );
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
  document.body.removeEventListener("mousemove", useMouseleave);
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
