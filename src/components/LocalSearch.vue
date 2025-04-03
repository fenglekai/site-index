<script lang="ts" setup>
import { onMounted, ref, watch, reactive } from "vue";
import google from "../assets/google.png";
import Bing from "../assets/Bing.png";
import baidu from "../assets/baidu.png";
import { navLink } from "../config/index";
import { screenWidth } from "../hook/use-mobile";

interface Props {
  hiddenHeader: boolean;
}

const props = defineProps<Props>();

const inputRef = ref<HTMLInputElement | null>(null)
watch(() => props.hiddenHeader, (newVal) => {
  if (newVal) {
    inputRef.value && inputRef.value.blur()
  }
})

/**
 * 搜索引擎
 *
 */
const focusInput = ref(false);
const selectList = [
  { img: google, url: "https://www.google.com/search", inputName: "q" },
  { img: Bing, url: "https://cn.bing.com/search", inputName: "q" },
  { img: baidu, url: "https://www.baidu.com/s", inputName: "wd" },
];
const searchSelected = ref(google);
const urlSelected = ref("https://www.google.com/search");
const inputSelected = ref("q");
const handleSearchSelect = (item: any) => {
  searchSelected.value = selectList[item].img;
  urlSelected.value = selectList[item].url;
  inputSelected.value = selectList[item].inputName;
};
const searchInput = ref("");

const searchList: any = [];
const dropDownMenu: any = ref([]);
const initSearchList = () => {
  for (const key in navLink) {
    for (const children in navLink[key]["children"]) {
      searchList.push(navLink[key]["children"][children]);
    }
  }
  dropDownMenu.value = searchList.slice(0, 10);
};
watch(searchInput, (newVal) => {
  const curVal = newVal.toLocaleLowerCase();
  dropDownMenu.value = searchList
    .filter((item: any, index: number) => {
      const toLowerSite = item.site.toLocaleLowerCase();
      const toLowerIntroduction = item.introduction.toLocaleLowerCase();
      return (
        toLowerSite.includes(curVal) || toLowerIntroduction.includes(curVal)
      );
    })
    .slice(0, 15);
});
const handleLocalLink = (url: string) => {
  window.open(url);
  focusInput.value = false;
};

const expand = ref(true);
watch(screenWidth, (newVal) => {
  if (newVal < 640) {
    expand.value = false;
  } else {
    expand.value = true;
  }
});

function handleFocus() {
  setAssociateSize();
  focusInput.value = true;
}

const searchRef = ref<HTMLDivElement>();
const associateSize = reactive({
  width: "0",
  left: "0",
  top: "0",
  zIndex: 999,
});
function setAssociateSize() {
  if (searchRef.value) {
    const { x, y } = searchRef.value.getBoundingClientRect();
    associateSize.width = searchRef.value.offsetWidth + "px";
    associateSize.left = x + "px";
    associateSize.top = y + searchRef.value.offsetHeight + "px";
  }
}

onMounted(() => {
  initSearchList();
  if (screenWidth.value < 640) {
    expand.value = false;
  } else {
    expand.value = true;
  }
  setAssociateSize();
});
</script>

<template>
  <!-- search -->
  <div class="flex justify-center">
    <form :action="urlSelected" target="_blank"
      :class="['relative max-w-lg md:shadow-lg grow w-full overflow-hidden', focusInput ? 'rounded-t-md' : 'rounded-md',]">
      <div id="search-input" ref="searchRef" :class="[
        'search-input bg-white/80 hover:bg-white flex items-center p-1 border z-20 sm:mx-auto',
        focusInput ? 'rounded-t-md' : 'rounded-md',
      ]">
        <div :class="['w-full flex px-2 py-1 rounded-md', focusInput ? 'bg-gray-500/25' : '']">
          <input ref="inputRef" type="text" :name="inputSelected" v-model="searchInput" maxlength="255"
            autocomplete="off" placeholder="请输入关键字"
            class="text-sm outline-none flex-grow min-w-0 text-black bg-transparent placeholder:text-gray-500"
            @focus="handleFocus" @focusout="focusInput = false" />
        </div>
      </div>
      <Teleport to="body">
        <div v-show="focusInput" :style="associateSize"
          class="associate-label absolute rounded-b-md overflow-hidden pb-2">
          <ul>
            <li class="px-4 py-1 text-gray-600 cursor-pointer transition-all hover:bg-orange-100/20 line-clamp-1"
              v-for="item in dropDownMenu" @mousedown="handleLocalLink(item.url)">
              <span class="text-orange-500 text-sm pr-2">{{ item.site }}</span>
              <span class="kai-text-2 text-xs">{{ item.introduction }}</span>
            </li>
            <li v-show="!dropDownMenu.length" class="kai-text-2 text-center pt-3">
              未搜索到本地内容
            </li>
          </ul>
        </div>
      </Teleport>
    </form>
  </div>
</template>

<style scoped>
.associate-label {
  background-color: var(--kai-bg);
  border-left: 1px solid var(--kai-c-border);
  border-right: 1px solid var(--kai-c-border);
  border-bottom: 1px solid var(--kai-c-border);
}
</style>
