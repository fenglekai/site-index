<script lang="ts" setup>
import { computed } from "vue";
import { useGlowCard } from "../hook/use-glow-card";
import { type touchCardParams, useTouchCard } from "../hook/use-touch-card";

interface Props {
  data: {
    icon?: string;
    site: string;
    url: string;
    introduction: string;
  };
  staticIcon?: boolean;
  collection?: (data: Props["data"]) => void;
  delete?: (data: Props["data"]) => void;
}

interface Emits {
  (e: "click", data: Props["data"]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { cardRef: glowCard } = useGlowCard({
  light: {
    color: "#F26419",
    blur: 50,
  },
});

const btnItems = computed(() => {
  const items: touchCardParams['items'] = []
  if (props.collection) {
    items.push({
      type: 'collection',
      onClick: () => {
        if (props.collection) {
          props.collection(props.data)
        }
      }
    })
  }
  if (props.delete) {
    items.push({
      type: 'delete',
      onClick: () => {
        if (props.delete) {
          props.delete(props.data)
        }
      }
    })
  }
  return items
})

const showCover = ref(false)
const coverRef = ref<HTMLDivElement | null>(null)

const { setShowCover } = useTouchCard({
  showCover,
  cardRef: glowCard,
  coverRef,
  items: btnItems.value
})

const pageLoad = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageLoad.value = true
  }, 200);
})
</script>

<template>
  <div class="kai-card-bg p-4 rounded-md shadow-md transition-all group overflow-hidden cursor-pointer" ref="glowCard"
    @click="$emit('click', props.data)" @focusout="() => setShowCover(false)">
    <div style="perspective: 1000px; transform-style: preserve-3d;">
      <p class="kai-text font-bold text-md break-all flex gap-1 mb-2">
      <div v-if="!pageLoad"></div>
      <img v-else-if="staticIcon" :src="props.data.icon
        ? props.data.icon
        : `https://favicon.im/${props.data.url}`
        " class="icon" />
      <img v-else v-lazy :data-src="props.data.icon
        ? props.data.icon
        : `https://favicon.im/${props.data.url}`
        " class="icon" />
      <span class="line-clamp-2">{{ props.data.site }}</span>
      </p>
      <p class="kai-text-2 text-sm break-all line-clamp-3">
        {{ props.data.introduction }}
      </p>
    </div>
    <Transition name="fade">
      <div v-show="showCover" ref="coverRef"
        class="absolute w-full h-full p-4 top-0 left-0 backdrop-blur-sm flex justify-around items-center"></div>
    </Transition>
  </div>
</template>

<style scoped>
.glow-card {
  width: 200px;
  height: 100px;
  border: 1px solid #a5a3a3;
  border-radius: 15px;
  box-shadow: 3px 3px 5px #a5a3a3;
  padding: 6px 12px;
}

.icon {
  width: 24px;
  height: 24px;
}

.kai-card-bg {
  background-color: transparent;
}
.kai-card-bg:hover {
  background-color: transparent;
}
</style>
