<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  LoaderGLTF,
  PanoramaCube,
  PanoramaEquirectangular,
  Spotlight,
  StarrySky,
  UnrealBloom,
} from "../hook/use-module";
import WebGL from "../hook/use-webGL";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";

const router = useRouter();

const canvasWrapper: any = ref(null);

const props = defineProps({
  showList: {
    type: Boolean,
    default: () => {
      return true;
    },
  },
});

const removeChild = () => {
  return new Promise((resolve) => {
    // 清理多余元素节点
    const canvasLen = canvasWrapper.value.children.length;
    const bodyLen = document.body.children.length;
    for (let i = canvasLen - 1; i > 0; i--) {
      if (i >= 1) {
        canvasWrapper.value.removeChild(canvasWrapper.value.children[i]);
      }
    }
    for (let i = bodyLen - 1; i > 0; i--) {
      if (document.body.children[i]?.className.includes("lil-gui")) {
        document.body.removeChild(document.body.children[i]);
      }
    }
    setTimeout(() => {
      resolve(true);
    }, 200);
  });
};

const handleSwitch = async (index = 0) => {
  // WebGL兼容性检查
  if (WebGL.isWebGLAvailable()) {
    const loadingInstance = ElLoading.service({
      fullscreen: true,
    });
    try {
      await removeChild();
      loadingInstance.close();
    } catch (error) {
      console.log(error);
    }

    // 3D模型
    const canvas = new StarrySky(canvasWrapper.value);
    const canvas1 = new Spotlight(canvasWrapper.value);
    const canvas2 = new LoaderGLTF(canvasWrapper.value);
    const canvas3 = new PanoramaCube(canvasWrapper.value);
    const canvas4 = new PanoramaEquirectangular(canvasWrapper.value);
    const canvas5 = new UnrealBloom(canvasWrapper.value);

    switch (index) {
      case 1:
        canvas1.init();
        break;
      case 2:
        canvas2.init();
        break;
      case 3:
        canvas3.init();
        break;
      case 4:
        canvas4.init();
        break;
      case 5:
        canvas5.init();
        break;

      default:
        canvas.init();
        break;
    }
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    canvasWrapper.value.appendChild(warning);
  }
};

const list = [
  {
    title: "星空",
    index: 0,
  },
  {
    title: "雕像",
    index: 1,
  },
  {
    title: "头盔",
    index: 2,
  },
  {
    title: "第一视角全景图",
    index: 3,
  },
  {
    title: "视频播放",
    index: 4,
  },
  {
    title: "动态模型",
    index: 5,
  },
];

onMounted(() => {
  handleSwitch();
});
</script>

<template>
  <div class="relative w-screen h-screen" ref="canvasWrapper">
    <ul
      v-if="props.showList"
      class="absolute w-3/4 sm:w-auto right-10 bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded overflow-hidden flex flex-wrap justify-center"
    >
      <li
        v-for="item in list"
        @click="handleSwitch(item.index)"
        class="p-2 border-r text-center cursor-pointer transition hover:bg-gray-100"
      >
        {{ item.title }}
      </li>
      <li
        @click="
          router.push('/nav');
          removeChild();
        "
        class="p-2 flex justify-center items-center cursor-pointer transition hover:bg-gray-100"
      >
        <el-icon><IEpBack /></el-icon>
        回导航
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
../hook../hook/WebGL../hook/use-threejs../hook/use-webGL