<script lang="ts" setup>
import {} from "vue";
import { useGlowCard } from "../hook/use-glow-card";

interface Props {
  data: {
    icon?: string;
    site: string;
    url: string;
    introduction: string;
  };
}

interface Emits {
  (e: "click", data: Props['data']): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { cardRef: glowCard } = useGlowCard({
  light: {
    color: "#F26419",
    blur: 50,
  },
});
</script>

<template>
  <div
    class="p-4 bg-white border rounded-md shadow-md transition-all group overflow-hidden cursor-pointer"
    ref="glowCard"
    @click="$emit('click', props.data)"
  >
    <p class="font-bold text-md break-words flex gap-1 mb-2">
      <img
        :src="
          props.data.icon
            ? props.data.icon
            : `https://favicon.im/${props.data.url}`
        "
        :style="{ width: '24px' }"
      />
      {{ props.data.site }}
    </p>
    <p class="text-gray-400 text-sm break-words">
      {{ props.data.introduction }}
    </p>
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
</style>
