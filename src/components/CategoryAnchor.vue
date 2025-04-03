<script lang="ts" setup>
import {
    CaretBottom,
} from '@element-plus/icons-vue'
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

const collapse = ref(false)
const handleCollapse = () => {
    collapse.value = !collapse.value
}


</script>

<template>
    <div class="relative">
        <div ref="container" class="width-full py-2 whitespace-nowrap overflow-x-scroll mr-8"
            :style="{ zIndex: 2 }" @wheel="handleWheelContainer">
            <div v-for="item in navLink"
                class="kai-card-bg kai-text-2 mr-2 inline-block px-3 py-1 rounded-md text-sm cursor-pointer"
                @click="handleNavClick(item.id)">{{ item.navTitle }}</div>
        </div>

        <div class="absolute bottom-0 -right-5 p-2 h-full">
            <div class="kai-card-bg kai-text-2 px-2 h-7 rounded-md flex items-center cursor-pointer"
                @click="handleCollapse">
                <el-icon>
                    <CaretBottom />
                </el-icon>
            </div>
        </div>

        <el-drawer v-model="collapse" :with-header="false" append-to-body direction="ttb" size="auto">
            <div class="flex flex-wrap gap-2">
                <div v-for="item in navLink"
                    class="kai-card-bg kai-text-2 inline-block px-3 py-1 rounded-md text-sm text-gray-500 cursor-pointer"
                    @click="handleNavClick(item.id)">{{ item.navTitle }}</div>
            </div>
        </el-drawer>
    </div>
</template>