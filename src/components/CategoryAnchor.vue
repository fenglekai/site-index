<script lang="ts" setup>
import { NavLinkItem } from '../config';

interface Props {
    navLink: NavLinkItem[]
}

defineProps<Props>()

const handleNavClick = (key: string = "home") => {
    let doc: Document | any = document;
    doc.querySelector(`#${key}`).scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
    <div class="sticky top-0 py-2 flex gap-2 flex-wrap bg-white" :style="{ zIndex: 2 }">
        <div v-for="item in navLink"
            class="bg-gray-100 hover:bg-gray-200 px-3 py-1 border border-gray-50 rounded-md text-sm text-gray-500 cursor-pointer"
            @click="handleNavClick(item.navTitle)">{{ item.navTitle }}</div>
    </div>
</template>