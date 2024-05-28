<script lang="ts" setup>
import { inject } from "vue";
import { navLink } from "../../config/index";
import { useRouter } from "vue-router";

const router = useRouter();

const menuCollapse = defineModel("menuCollapse", {type: Boolean})
const props = defineProps(["dark", "headerHeight"]);
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
  <div
    :class="[
      'el-menu-list relative wrapper',
      menuCollapse ? 'el-menu--collapse' : null,
    ]"
  >
    <el-menu
      class="el-menu-list backdrop-blur-md"
      :style="[
        props.dark ? 'border-right: none;' : '',
        `min-height: calc(100vh - ${props.headerHeight});`,
      ]"
      background-color="transparent"
      :text-color="
        props.dark && props.headerHeight == '180px'
          ? '#ffffff'
          : '#343434'
      "
      :collapse="menuCollapse"
      active-text-color="#F6AE2D"
      @select="handleSelect"
    >
      <template v-for="item in navLink">
        <el-menu-item
          :index="item.navTitle"
          @click="handleNavClick(item.navTitle)"
          ><el-icon><IEpLocation /></el-icon>
          <template #title>
            {{ item.navTitle }}
          </template>
        </el-menu-item>
      </template>
      <el-menu-item index="threeJS" @click="emits('darkSwitch')"
        ><el-icon><IEpMagicStick /></el-icon>
        <template #title> 3D模型渲染 </template>
      </el-menu-item>
      <el-menu-item
        index="threeJS"
        v-show="darkBackground"
        @click="router.push('/threeJS')"
        ><el-icon><IEpRight /></el-icon
        ><template #title>去看看</template></el-menu-item
      >
    </el-menu>
    <div
      class="hidden sm:flex absolute left-2 bottom-2 items-center cursor-pointer transition-all"
    >
      <el-button type="info" text bg @click="menuCollapse = !menuCollapse;">
        <div style="width: 20px" class="overflow-hidden">
          <div
            class="transition-all space-x-1"
            :style="{
              transform: menuCollapse
                ? 'translateX(calc(-20px - 0.25rem))'
                : 'translateX(0px)',
            }"
          >
            <el-icon class="text-slate-500" size="20"><IEpFold /></el-icon>
            <el-icon class="text-slate-500" size="20"><IEpExpand /></el-icon>
          </div>
        </div>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  transition: 0.3s;
}
.el-menu-list {
  height: 100%;
}
.el-menu-list:not(.el-menu--collapse) {
  width: 200px;
}
</style>
