<script lang="ts" setup>
import { animate } from 'animejs';
import useBaseStore from '../store/base';

const baseStore = useBaseStore()

watch(() => baseStore.isLoading, async (val) => {
  if (val) {
    showPage.value = true
    backgroundLoad()
    textLoad()
    svgLoad()
  } else {
    await nextTick()
    backgroundUnload()
    textUnload()
    svgUnload()
  }
})

onMounted(() => {
  animate(['feTurbulence', 'feDisplacementMap'], {
    baseFrequency: .05,
    scale: 15,
    alternate: true,
    loop: true
  });
  animate('polygon', {
    points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
    alternate: true,
    loop: true
  });
})

const showPage = ref(false)
const mainText = 'KAI Site.'
const textList = computed(() => {
  return mainText.split('');
})

const textRef = ref<HTMLDivElement>();
const bgRef = ref<HTMLDivElement>();

const backgroundLoad = () => {
  if (!bgRef.value) return
  const clientHeight = document.documentElement.clientHeight
  const clientWidth = document.documentElement.clientWidth
  const side = Math.max(clientHeight, clientWidth)
  animate(bgRef.value, {
    width: side * 2, height: side * 2, duration: 500, onComplete: () => {
      setTimeout(() => {
        baseStore.setLoadingComplete(true)
      }, 500);
    }
  })
}
const backgroundUnload = () => {
  if (!bgRef.value) return
  animate(bgRef.value, {
    width: 0, height: 0, duration: 500, onComplete: () => {
      setTimeout(() => {
        showPage.value = false
      }, 500);
    }
  })
}

const textLoad = () => {
  if (!textRef.value) return
  const textChildren = textRef.value.children;
  for (let i = 0; i < textChildren.length; i++) {
    const span = textChildren[i] as HTMLSpanElement
    animate(span, { opacity: 1, transform: 'scale(1) translateY(10px)', duration: 250, delay: 10 * (i + 1) })
  }
};
const textUnload = () => {
  if (!textRef.value || !bgRef.value) return
  const textChildren = textRef.value.children;
  for (let i = 0; i < textChildren.length; i++) {
    const span = textChildren[i] as HTMLSpanElement
    animate(span, { opacity: 0, transform: 'scale(0) translateY(10px)', duration: 250, delay: 10 * (i + 1) })
  }
};

const svgLoad = () => {
  animate('.animate-wrapper', {
    opacity: 0.5
  });

}

const svgUnload = () => {
  animate('.animate-wrapper', {
    opacity: 0
  });
}
</script>

<template>
  <div v-show="showPage" id="load"
    class="w-screen h-screen fixed top-0 left-0 z-50 text-white text-5xl flex justify-center items-center">
    <div ref="bgRef" id="start-load-wrapper"
      class="kai-bg absolute w-full h-full flex justify-center items-center transition-all"></div>
    <div ref="textRef" class="kai-text absolute w-full h-full flex justify-center items-center">
      <span v-for="text in textList" v-html="text.trim() === '' ? '&nbsp' : text" class="transition-all"
        style="opacity: 0; transform: scale(0) translateY(10px)"></span>
    </div>
    <div class="animate-wrapper kai-text">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <filter id="displacementFilter">
          <feTurbulence type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <polygon points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96" fill="currentColor"
          filter="url(#displacementFilter)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
#load {
  font-family: "Days One", "Arial Black", "Copperplate", sans-serif;
  background-color: transparent;
}

#start-load-wrapper {
  width: 0px;
  height: 0px;
  border-radius: 100%;
  background-color: var(--kai-bg);
}

.animate-wrapper {
  opacity: 0.5;
}
</style>
