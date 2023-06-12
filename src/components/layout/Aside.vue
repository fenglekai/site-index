<script lang="ts" setup>
import { inject } from "vue";
import { navLink } from "../../config/index";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(['dark'])
const emits = defineEmits(["darkSwitch"]);

const darkBackground = inject("darkBackground");

const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const handleNavClick = (key: string = "home") => {
  let doc: Document | any = document;
  doc.querySelector(`#${key}`).scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="h-full">
    <el-menu
      class="el-menu-list"
      background-color="transparent"
      :text-color="props.dark ? '#ffffff' : '#343434'"
      :style="props.dark ? 'border-right: none;' : ''"
      active-text-color="#F6AE2D"
      :ellipsis="false"
      @select="handleSelect"
    >
      <template v-for="item in navLink">
        <el-menu-item
          :index="item.navTitle"
          @click="handleNavClick(item.navTitle)"
          ><el-icon><location /></el-icon>{{ item.navTitle }}</el-menu-item
        >
      </template>
      <el-menu-item index="threeJS" @click="emits('darkSwitch')"
        ><el-icon><MagicStick /></el-icon>3D模型渲染</el-menu-item
      >
      <el-menu-item
        index="threeJS"
        v-show="darkBackground"
        @click="router.push('/threeJS')"
        ><el-icon><Right /></el-icon>去看看</el-menu-item
      >
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu-list {
  min-height: calc(100vh - 180px);
  height: 100%;
}
.flex-grow {
  flex-grow: 1;
}
</style>
