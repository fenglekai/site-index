<script lang="ts" setup>
import { } from "vue";
import { useGlowCard } from "../hook/use-glow-card";

interface Props {
  data: {
    icon?: string;
    site: string;
    url: string;
    introduction: string;
  };
  staticIcon?: boolean;
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

const pageLoad = ref(false)
onMounted(() => {
  setTimeout(() => {
    pageLoad.value = true
  }, 200);
})
</script>

<template>
  <div class="p-4 bg-white border rounded-md shadow-md transition-all group overflow-hidden cursor-pointer"
    ref="glowCard" @click="$emit('click', props.data)">
    <div style="perspective: 1000px; transform-style: preserve-3d;">
      <p class="font-bold text-md break-all flex gap-1 mb-2">
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
      <p class="text-gray-500 text-sm break-all line-clamp-3">
        {{ props.data.introduction }}
      </p>
    </div>
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
</style>
