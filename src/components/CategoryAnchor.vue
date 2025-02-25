<script lang="ts" setup>
import { NavLinkItem } from '../config';

interface Props {
    navLink: NavLinkItem[]
}

defineProps<Props>()

const handleNavClick = (key: string = "person") => {
    document.querySelector(`#${key}`)?.scrollIntoView({ behavior: "smooth", block: 'start' });
};

const container = ref<HTMLDivElement | null>(null)
const handleWheelContainer = (e: WheelEvent) => {
    e.preventDefault();
    const scrollAmount = e.deltaY > 0 ? 50 : -50;
    if (!container.value) return
    container.value.scrollLeft += scrollAmount
}
</script>

<template>
    <div ref="container" class="width-full py-2 bg-white whitespace-nowrap overflow-x-scroll transition" :style="{ zIndex: 2 }"
        @wheel="handleWheelContainer">
        <div v-for="item in navLink"
            class="mr-2 inline-block bg-gray-100 hover:bg-gray-200 px-3 py-1 border border-gray-50 rounded-md text-sm text-gray-500 cursor-pointer"
            @click="handleNavClick(item.id)">{{ item.navTitle }}</div>
    </div>
</template>