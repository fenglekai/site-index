<script lang="ts" setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Collection, Plus, Delete } from "@element-plus/icons-vue";
import { navLink, NavLinkItem, NavLinkItemChild } from "../config/index";
import Twikoo from "../components/Twikoo.vue";
import { useLoading } from "../hook/use-loading";
import { useBaseStore } from "../store/base";

onMounted(async () => {
  loadNavLink();
  getLocalList();
  const baseNavTour = localStorage.getItem("base-nav-tour");
  if (!baseNavTour) {
    showTour.value = true;
  }
});

const baseStore = useBaseStore();

useLoading();

// 分页加载数据
const currentPage = ref(0);
const defaultLoad = 3;
const container = ref<HTMLDivElement | null>(null);
const loadStatus = ref(false);
const asyncNavLink = ref<NavLinkItem[]>([]);
const loadNavLink = () => {
  asyncNavLink.value = navLink.slice(currentPage.value, defaultLoad);
  currentPage.value = defaultLoad;
};
const loadNextPage = (index: number = 1) => {
  if (currentPage.value < navLink.length) {
    loadStatus.value = true;
    const nextPage = currentPage.value + index;
    asyncNavLink.value.push(...navLink.slice(currentPage.value, nextPage));
    currentPage.value = nextPage;
    loadStatus.value = false;
  }
};
watch(
  () => baseStore.getNavScrollTop,
  () => {
    if (!container.value) return;
    const rect = container.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.bottom <= windowHeight && !loadStatus.value) {
      loadNextPage();
    }
  }
);
watch(
  () => baseStore.getloadPage,
  () => {
    if (!container.value) return;
    const needToLoad = baseStore.loadPage - currentPage.value + 1;
    if (needToLoad > 0) {
      loadNextPage(needToLoad);
    }
  }
);

// 引导提示
const showTour = ref(false);
const handleTourFinish = () => {
  localStorage.setItem("base-nav-tour", "1");
};

const handleClick = (site: NavLinkItemChild) => {
  addHistoryRow(site);
  window.open(site.url);
};

/**
 * 我的链接&历史访问
 *
 */

// 历史访问
const historyList = ref<NavLinkItemChild[]>([]);
const getLocal = () => {
  const localHistory = localStorage.getItem("history-list");
  if (localHistory) {
    if (JSON.parse(localHistory) instanceof Array) {
      return JSON.parse(localHistory);
    } else {
      localStorage.setItem("history-list", JSON.stringify([]));
      return [];
    }
  } else {
    localStorage.setItem("history-list", JSON.stringify([]));
    return [];
  }
};

const addHistoryRow = (site: NavLinkItemChild) => {
  let localHistory: NavLinkItemChild[] = getLocal();
  localHistory.unshift(site);
  // 只保留15条
  localHistory = localHistory.slice(0, 14);
  // 去重
  function uniqueFunc(arr: NavLinkItemChild[], uniId: any) {
    const res = new Map();
    return arr.filter(
      (item: any) => !res.has(item[uniId]) && res.set(item[uniId], 1)
    );
  }
  localHistory = uniqueFunc(localHistory, "url");
  historyList.value = localHistory;
  localStorage.setItem("history-list", JSON.stringify(localHistory));
};
const deleteHistoryRow = (row: any) => {
  const localHistory = getLocal();
  const filterList = localHistory.filter((item: any) => {
    if (item.title == row.title && item.url == row.url) {
      return false;
    } else {
      return true;
    }
  });
  historyList.value = filterList;
  localStorage.setItem("history-list", JSON.stringify(filterList));
};

// 我的链接
const ownList = ref<NavLinkItemChild[]>([]);
const getSelfLocal = (): NavLinkItemChild[] => {
  const localOwn = localStorage.getItem("own-list");
  if (localOwn) {
    if (JSON.parse(localOwn) instanceof Array) {
      return JSON.parse(localOwn);
    } else {
      localStorage.setItem("own-list", JSON.stringify([]));
      return [];
    }
  } else {
    localStorage.setItem("own-list", JSON.stringify([]));
    return [];
  }
};

const showAddForm = ref(false);
const ownFormRef = ref<FormInstance>();
const formLabelAlign = reactive({
  site: "",
  url: "http://",
  introduction: "",
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      addOwnLink(formLabelAlign);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  formEl.clearValidate();
  showAddForm.value = false;
};

const addOwnLink = (site: NavLinkItemChild) => {
  let selfLocal = getSelfLocal();
  selfLocal.push(site);
  // 去重
  function uniqueFunc(arr: any[], uniId: string) {
    const res = new Map();
    return arr.filter(
      (item) => !res.has(item[uniId]) && res.set(item[uniId], item)
    );
  }
  selfLocal = uniqueFunc(selfLocal, "site");
  ownList.value = selfLocal;
  localStorage.setItem("own-list", JSON.stringify(selfLocal));
  showAddForm.value = false;
};
const deleteOwnRow = (row: NavLinkItemChild) => {
  const selfLocal = getSelfLocal();
  const filterList = selfLocal.filter((item: any) => {
    if (item.site == row.site && item.url == row.url) {
      return false;
    } else {
      return true;
    }
  });
  ownList.value = filterList;
  localStorage.setItem("own-list", JSON.stringify(filterList));
};

const cleanHistory = () => {
  localStorage.setItem("history-list", JSON.stringify([]));
  historyList.value = [];
};

const getLocalList = () => {
  historyList.value = getLocal();
  ownList.value = getSelfLocal();
};

// 链接导出
const handleDownload = () => {
  if (ownList.value.length == 0) {
    return ElMessage.warning("没有可导出链接");
  }
  const link = getSelfLocal();
  let blob: any = new Blob([JSON.stringify(link, null, 2)], {
    type: "application/json",
  });
  const AElement = document.createElement("a");
  AElement.href = URL.createObjectURL(blob);
  AElement.download = "link.json";
  document.body.appendChild(AElement);
  AElement.click();
  URL.revokeObjectURL(AElement.href);
  blob = null;
  document.body.removeChild(AElement);
};

// 链接导入
const handleUpload = () => {
  const InputElement = document.createElement("input");
  InputElement.type = "file";
  InputElement.click();
  InputElement.addEventListener(
    "change",
    (e: any) => {
      const files = e.target.files;
      const linkFile = files[0];
      if (linkFile.type !== "application/json") {
        return ElMessage.error("不支持此文件类型导入");
      }
      if (linkFile.size > 1 * 1024 * 1024) {
        return ElMessage.error("文件大小超过1M");
      }
      const reader = new FileReader();
      reader.readAsText(linkFile);
      reader.onload = function () {
        try {
          if (typeof this.result == "string") {
            const link: NavLinkItemChild = JSON.parse(this.result);
            if (!(link instanceof Array)) {
              throw Error("数据格式不是数组");
            }
            for (const key in link) {
              if (!link[key].site || !link[key].url) {
                throw Error("数据字段不存在site或者url");
              }
            }
            localStorage.setItem("own-list", JSON.stringify(link));
            ownList.value = getSelfLocal();
            ElMessage.success("导入成功");
          } else {
            throw Error("链接导入失败");
          }
        } catch (error: any) {
          console.error(error);
          ElMessage.error("链接导入失败");
        }
      };
    },
    false
  );
};
</script>

<template>
  <!-- 我的链接 -->
  <section class="mb-6 space-y-2">
    <div
      class="flex items-center space-x-2 sticky top-0 backdrop-blur"
      :style="{ zIndex: 1 }"
    >
      <h2 class="kai-text md:text-xl sm:text-sm py-2">我的链接</h2>
      <div
        id="save"
        class="kai-text-2 flex cursor-pointer transition-all kai-text-hover"
      >
        <el-icon @click="handleDownload">
          <IEpDownload />
        </el-icon>
        <span class="text-xs pl-1">保存</span>
      </div>
      <div
        id="load"
        class="kai-text-2 flex cursor-pointer transition-all kai-text-hover"
      >
        <el-icon @click="handleUpload">
          <IEpUpload />
        </el-icon>
        <span class="text-xs pl-1">上传</span>
      </div>
    </div>
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 px-2"
    >
      <template v-for="item in ownList">
        <el-dropdown
          trigger="contextmenu"
          style="position: static; z-index: 0; display: inline-grid"
        >
          <GlowCard
            staticIcon
            class="w-full leading-6 text-base text-gray-700"
            :data="item"
            :delete="deleteOwnRow"
            @click="() => (item.onClick ? item.onClick() : handleClick(item))"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Delete" @click="deleteOwnRow(item)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <div
        id="add-own-link"
        class="kai-text border border-dashed rounded-md flex justify-center items-center min-h-24 cursor-pointer"
        @click="showAddForm = !showAddForm"
      >
        <el-icon size="24px">
          <Plus />
        </el-icon>
      </div>
    </div>
  </section>
  <!-- 历史访问 -->
  <section class="mb-6 space-y-2">
    <h2
      class="kai-text sticky top-0 md:text-xl sm:text-sm backdrop-blur py-2"
      :style="{ zIndex: 1 }"
    >
      历史访问
      <span class="kai-text-2 mx-2 text-sm">显示最近15条访问记录</span>
      <el-button type="danger" link @click="cleanHistory">清空历史</el-button>
    </h2>
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 px-2"
    >
      <template v-for="item in historyList">
        <el-dropdown trigger="contextmenu" style="position: static">
          <GlowCard
            staticIcon
            class="w-full leading-6 text-base text-gray-700"
            :data="item"
            :collection="addOwnLink"
            :delete="deleteOwnRow"
            @click="() => (item.onClick ? item.onClick() : handleClick(item))"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Collection" @click="addOwnLink(item)"
                >收藏</el-dropdown-item
              >
              <el-dropdown-item :icon="Delete" @click="deleteHistoryRow(item)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
  </section>
  <!-- 配置站点 -->
  <div ref="container">
    <section
      v-for="category in asyncNavLink"
      :key="category.id"
      :id="category.id"
      class="mb-6"
    >
      <h2
        class="kai-text sticky top-0 md:text-xl sm:text-sm backdrop-blur py-2"
        :style="{ zIndex: 1 }"
      >
        {{ category.navTitle }}
      </h2>
      <div
        class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 px-2"
      >
        <el-dropdown
          v-for="item in category.children"
          :key="item.site"
          trigger="contextmenu"
          style="position: static"
        >
          <GlowCard
            class="w-full leading-6 text-base text-gray-700"
            :data="item"
            :collection="addOwnLink"
            @click="() => (item.onClick ? item.onClick() : handleClick(item))"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Collection" @click="addOwnLink(item)"
                >收藏</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </section>
  </div>
  <!-- 评论 -->
  <section class="space-y-2">
    <h2
      class="kai-text sticky top-0 md:text-xl sm:text-sm backdrop-blur font-semibold py-2"
    >
      评论
    </h2>
    <div class="px-2 kai-text">
      <Twikoo />
    </div>
  </section>

  <el-drawer
    v-model="showAddForm"
    direction="btt"
    size="auto"
    @closed="resetForm(ownFormRef)"
  >
    <template #header>
      <h4>添加站点</h4>
    </template>
    <template #default>
      <el-form ref="ownFormRef" :model="formLabelAlign">
        <el-form-item
          label="网站名称"
          prop="site"
          :rules="[{ required: true, message: '请输入网站名称' }]"
        >
          <el-input
            v-model="formLabelAlign.site"
            placeholder="网站名称"
            size="small"
          />
        </el-form-item>
        <el-form-item
          label="网站地址"
          prop="url"
          :rules="[{ required: true, message: '请输入网站地址' }]"
        >
          <el-input
            v-model="formLabelAlign.url"
            placeholder="网站地址"
            size="small"
          />
        </el-form-item>
        <el-form-item
          label="网站描述"
          prop="introduction"
          :rules="[{ required: true, message: '请输入网站描述' }]"
        >
          <el-input
            v-model="formLabelAlign.introduction"
            placeholder="网站描述"
            size="small"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="submitForm(ownFormRef)"
          >添加</el-button
        >
        <el-button @click="resetForm(ownFormRef)">取消</el-button>
      </div>
    </template>
  </el-drawer>

  <div class="kai-text">
    <el-tour
      v-model="showTour"
      :content-style="{ width: '300px' }"
      @close="handleTourFinish"
      @finish="handleTourFinish"
    >
      <el-tour-step
        :next-button-props="{ children: '下一步' }"
        target="#search-input"
        title="搜索"
        description="输入框搜索链接"
      />
      <el-tour-step
        :prev-button-props="{ children: '上一步' }"
        :next-button-props="{ children: '下一步' }"
        target="#save"
        title="保存"
        description="保存添加的链接到本地"
      />
      <el-tour-step
        :prev-button-props="{ children: '上一步' }"
        :next-button-props="{ children: '下一步' }"
        target="#load"
        title="上传"
        description="上传导入之前的链接"
      />
      <el-tour-step
        :prev-button-props="{ children: '上一步' }"
        :next-button-props="{ children: '下一步' }"
        target="#add-own-link"
        title="新增链接"
        description="手动新增一个链接"
      />
      <el-tour-step
        :prev-button-props="{ children: '上一步' }"
        :next-button-props="{ children: '下一步' }"
        title="操作卡片"
      >
        <p class="mb-1">电脑右键卡片打开下拉菜单</p>
        <p>手机在卡片上长按显示操作按钮</p>
      </el-tour-step>
      <el-tour-step
        :prev-button-props="{ children: '上一步' }"
        :next-button-props="{ children: '结束' }"
        target="#logo"
        title="提示"
        description="这里可以再次打开引导提示"
      />
    </el-tour>
  </div>
</template>

<style scope>
.kai-card-bg:hover {
  background-color: var(--kai-c-bg);
}
</style>
