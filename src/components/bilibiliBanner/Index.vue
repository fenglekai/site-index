<script lang="ts">
import { ref } from "vue";
import { Layout } from "./types";
</script>
<script lang="ts" setup>
const props = defineProps<{
  layout: Array<Layout>;
}>();

const biliWrapper = ref<HTMLDivElement | null>(null);
const animated = ref<HTMLDivElement | null>(null);
const layerList = ref(props.layout || []);
const duration = 300;
let startTime = 0;
let startX = 0;
let moveX = 0;

// 存储原始transform值
const nodeTransformList = computed(() => {
  const result = [];
  if (animated.value) {
    for (let i = 0; i < animated.value.children.length; i++) {
      result.push((animated.value.children[i].children.item(0) as HTMLImageElement).style.transform);
    }
  }
  return result
});

// 获取字符串translate X,Y值
const getTranslateXY = (transform: string) => {
  const matchStr = transform
    .match(/translate\(([^px]+)px,\s*([^px)]+)px\)/)
  if (matchStr) {
    return [Number(matchStr[1]), Number(matchStr[2])];
  }
  return [0, 0]
};

// 获取字符串旋转值
const getRotate = (transform: string) => {
  const matchStr = transform
    .match(/rotate\(([^deg]+)deg\)/)
  if (matchStr) {
    return Number(
      matchStr[1]
    );
  }
  return 0
};

// 设置过渡变化
const setTransform = (progress?: number) => {
  const resetFlag = typeof progress == 'number';
  for (let i = 0; i < layerList.value.length; i++) {
    const {
      key,
      translateXPower,
      translateYPower,
      disableTranslateX,
      rotatePower,
    } = layerList.value[i];
    const img = animated.value?.children[key].children[0] as HTMLImageElement;
    const translateXY = getTranslateXY(nodeTransformList.value[key]);
    const defaultRotate = getRotate(nodeTransformList.value[key]);
    let x = translateXY[0];
    let y = translateXY[1];
    let rotate = defaultRotate;
    if (translateXPower) {
      if (resetFlag) {
        x += !disableTranslateX ? moveX * (1 - progress) * translateXPower : 0;
        y += translateYPower ? moveX * (1 - progress) * translateYPower : 0;
      } else {
        x += !disableTranslateX ? moveX * translateXPower : 0;
        y += translateYPower ? moveX * translateYPower : 0;
      }
    }
    if (rotatePower) {
      if (resetFlag) {
        rotate = -moveX * (1 - progress) * rotatePower
      } else {
        rotate = -moveX * rotatePower
      }
    }
    img.style.transform = `translate(${x}px , ${y}px) rotate(${rotate}deg) scale(1)`;
  }
}

// 回归过渡
// references: https://github.com/palxiao/bilibili-banner/blob/main/index.js
const resetTransform = (timestamp: number) => {
  !startTime && (startTime = timestamp)
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / duration, 1);
  setTransform(progress)
  progress < 1 && requestAnimationFrame(resetTransform)
};

const useMouseenter = (e: MouseEvent) => {
  startX = e.x;
}

const moveAnimation = () => {
  setTransform()
}

const useMousemove = (e: MouseEvent) => {
  moveX = e.x - startX;
  requestAnimationFrame(moveAnimation)
};

const useMouseleave = (e: MouseEvent) => {
  startTime = 0
  requestAnimationFrame(resetTransform)
};

onMounted(() => {
  biliWrapper.value?.addEventListener("mouseenter", useMouseenter);
  biliWrapper.value?.addEventListener("mousemove", useMousemove);
  biliWrapper.value?.addEventListener("mouseleave", useMouseleave);
});
onBeforeUnmount(() => {
  biliWrapper.value?.removeEventListener("mouseenter", useMouseenter);
  biliWrapper.value?.removeEventListener("mousemove", useMousemove);
  biliWrapper.value?.removeEventListener("mouseleave", useMouseleave);
});
</script>

<template>
  <div ref="biliWrapper" class="bili-header">
    <div class="bili-header__banner">
      <div ref="animated" class="animated-banner">
        <slot></slot>
      </div>
      <div class="relative w-full h-full">
        <slot name="content"></slot>
      </div>
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
  min-height: 155px;
  height: 180px;
  max-height: 240px;
  background-color: var(--kai-bg);
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

.bili-header .animated-banner>.layer {
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
