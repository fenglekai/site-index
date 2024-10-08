<script lang="ts" setup>
import { Ref, inject, onMounted, ref, watch, reactive } from "vue";
import google from "../assets/google.png";
import Bing from "../assets/Bing.png";
import baidu from "../assets/baidu.png";
import { ElMessage } from "element-plus";
import { navLink } from "../config/index";

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
const handleSearch = (e: Event) => {
  if (!expand.value) {
    e.preventDefault();
    expand.value = true;
    return;
  }
  if (!searchInput.value) {
    e.preventDefault();
    ElMessage.warning("请输入搜索内容");
  }
};

const localSearch: any = ref(false);
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
  if (dropDownMenu.value.length > 0) {
    localSearch.value = true;
  } else {
    localSearch.value = false;
  }
});
const handleFocusout = () => {
  focusInput.value = false;
  localSearch.value = false;
};
const handleLocalLink = (url: string) => {
  focusInput.value = false;
  localSearch.value = false;
  window.open(url);
};

const screenWidth: Ref<number> = inject("screenWidth") || ref(0);
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
    const {x,y} = searchRef.value.getBoundingClientRect()
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
    <form
      :action="urlSelected"
      target="_blank"
      :class="[
        'relative max-w-lg shadow-lg grow rounded-full w-full',
        focusInput ? 'rounded-none' : 'rounded-full',
      ]"
    >
      <div
        ref="searchRef"
        :class="[
          'search-input bg-white/20 backdrop-blur flex items-center p-2 border z-20 sm:mx-auto',
          focusInput ? 'rounded-t-2xl' : 'rounded-full',
        ]"
      >
        <el-dropdown trigger="click" @command="handleSearchSelect">
          <div class="cursor-pointer flex items-center">
            <el-image
              style="width: 24px; height: auto; padding-right: 2px"
              :src="searchSelected"
            ></el-image>
            <el-icon><IEpCaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="0"
                ><el-image
                  style="width: auto; height: 24px; padding-right: 2px"
                  :src="google"
                ></el-image
              ></el-dropdown-item>
              <el-dropdown-item command="1"
                ><el-image
                  style="width: auto; height: 24px; padding-right: 2px"
                  :src="Bing"
                ></el-image
              ></el-dropdown-item>
              <el-dropdown-item command="2"
                ><el-image
                  style="width: auto; height: 24px; padding-right: 2px"
                  :src="baidu"
                ></el-image
              ></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <input
          type="text"
          :name="inputSelected"
          v-model="searchInput"
          maxlength="255"
          autocomplete="off"
          placeholder="请输入关键字"
          class="outline-none flex-grow min-w-0 bg-transparent focus:placeholder:text-white sm:placeholder:text-white px-2"
          @focus="handleFocus"
          @focusout="focusInput = false"
        />
        <el-tooltip effect="dark" content="搜索" placement="bottom">
          <div
            class="relative transition-all flex items-center hover:text-orange-400"
          >
            <el-icon size="24"><IEpSearch /></el-icon>
            <input
              type="submit"
              value=" "
              class="absolute cursor-pointer left-0 w-full h-full"
              @click="handleSearch"
            />
          </div>
        </el-tooltip>
      </div>
      <Teleport to="body">
        <div
          v-show="focusInput"
          :style="associateSize"
          class="associate-label absolute bg-white/50 backdrop-blur border-x-2 border-slate-200 rounded-b-2xl overflow-hidden pb-2"
        >
          <ul>
            <li
              class="px-4 py-2 cursor-pointer transition-all text-orange-500 hover:bg-orange-100 line-clamp-1"
              v-for="item in dropDownMenu"
              @click="handleLocalLink(item.url)"
            >
              {{ item.site }}
              <span class="text-gray-400 text-xs">{{ item.introduction }}</span>
            </li>
            <li
              v-show="!dropDownMenu.length"
              class="text-gray-400 text-center py-2"
            >
              未搜索到本地内容
            </li>
          </ul>
        </div>
      </Teleport>
    </form>
  </div>
</template>

<style scoped></style>
