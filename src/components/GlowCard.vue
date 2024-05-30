<script lang="ts" setup>
import {} from "vue";
import { useGlowCard } from "../hook/use-glow-card";

interface Props {
  data: {
    site: string;
    url: string;
    introduction: string;
  };
}

interface Emits {
  (e: "click", site: string, url: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { cardRef: glowCard } = useGlowCard({
    light: {
        color: '#F26419',
        blur: 50
    }
});
</script>

<template>
  <div
    class="p-4 bg-white border rounded-md shadow-md transition-all group overflow-hidden cursor-pointer"
    ref="glowCard"
  >
    <h3 class="font-bold text-md break-words">
      {{ props.data.site }}
    </h3>
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
