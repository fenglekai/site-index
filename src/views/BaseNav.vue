<script lang="ts" setup>
import { inject, onMounted, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import Giscus from "@giscus/vue";
import { Star, Plus, Delete, Edit } from "@element-plus/icons-vue";
import { navLink } from "../config/index";

interface SiteProps {
  icon?: string;
  site: string;
  url: string;
  introduction: string;
}

onMounted(() => {
  getLocalList();
});

const handleClick = (site: SiteProps) => {
  addHistoryRow(site);
  window.open(site.url);
};

/**
 * 我的链接&历史访问
 *
 */

// 历史访问
const historyList = ref<SiteProps[]>([]);
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

const addHistoryRow = (site: SiteProps) => {
  let localHistory: SiteProps[] = getLocal();
  localHistory.unshift(site);
  // 只保留15条
  localHistory = localHistory.slice(0, 14);
  // 去重
  function uniqueFunc(arr: SiteProps[], uniId: any) {
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
const ownList = ref<SiteProps[]>([]);
const getSelfLocal = (): SiteProps[] => {
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

const addOwnLink = (site: SiteProps) => {
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
const deleteOwnRow = (row: SiteProps) => {
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
            const link: SiteProps = JSON.parse(this.result);
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
  <div class="lg:flex gap-4 px-4">
    <div class="lg:flex-1">
      <!-- 我的链接 -->
      <section class="mb-6 space-y-2">
        <div class="flex items-center space-x-2 sticky top-0 backdrop-blur"
          :style="{ margin: 'auto -20px', zIndex: 1 }">
          <h2 class="text-xl p-2">我的链接</h2>
          <div class="flex cursor-pointer transition-all hover:text-orange-400">
            <el-icon @click="handleDownload">
              <IEpDownload />
            </el-icon>
            <span class="text-xs pl-1">保存到本地</span>
          </div>
          <div class="flex cursor-pointer transition-all hover:text-orange-400">
            <el-icon @click="handleUpload">
              <IEpUpload />
            </el-icon>
            <span class="text-xs pl-1">导入</span>
          </div>
        </div>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6">
          <template v-for="item in ownList">
            <el-dropdown trigger="contextmenu" style="position: static; z-index: 0; display: inline-grid">
              <GlowCard staticIcon class="w-full leading-6 text-base text-gray-700" :data="item"
                @click="handleClick(item)" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="Delete" @click="deleteOwnRow(item)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <div class="border border-dashed rounded-md flex justify-center items-center min-h-24 cursor-pointer"
            @click="showAddForm = !showAddForm">
            <el-icon size="24px">
              <Plus />
            </el-icon>
          </div>
        </div>
      </section>
      <!-- 历史访问 -->
      <section class="mb-6 space-y-2">
        <h2 class="sticky top-0 text-xl backdrop-blur p-2" :style="{ margin: 'auto -20px', zIndex: 1 }">
          历史访问
          <span class="mx-2 text-gray-500 text-sm">显示最近15条访问记录</span>
          <el-button type="danger" link @click="cleanHistory">清空历史</el-button>
        </h2>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6">
          <template v-for="item in historyList">
            <el-dropdown trigger="contextmenu" style="position: static">
              <GlowCard staticIcon class="w-full leading-6 text-base text-gray-700" :data="item"
                @click="handleClick(item)" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="Star" @click="addOwnLink(item)">收藏</el-dropdown-item>
                  <el-dropdown-item :icon="Delete" @click="deleteHistoryRow(item)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </div>
      </section>
      <!-- 配置站点 -->
      <template v-for="category in navLink">
        <section class="mb-6">
          <h2 :id="category.navTitle" class="sticky top-0 text-xl backdrop-blur p-2" :style="{ margin: 'auto -20px', zIndex: 1 }">
            {{ category.navTitle }}
          </h2>
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6">
            <template v-for="item in category.children">
              <el-dropdown trigger="contextmenu" style="position: static">
                <GlowCard class="w-full leading-6 text-base text-gray-700" :data="item" @click="handleClick(item)" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :icon="Star" @click="addOwnLink(item)">收藏</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </div>
        </section>
      </template>
      <!-- 评论 -->
      <section class="space-y-2">
        <h2 class="sticky top-0 text-2xl backdrop-blur p-2" :style="{ margin: 'auto -20px' }">
          评论
        </h2>
        <Giscus id="comments" repo="fenglekai/giscus" repoId="R_kgDOKS-Cjg" category="Announcements"
          categoryId="DIC_kwDOKS-Cjs4CZRcG" mapping="pathname" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
          theme="light" lang="zh-CN" loading="lazy" />
      </section>
    </div>
  </div>

  <el-drawer v-model="showAddForm" direction="btt" size="35%" @closed="resetForm(ownFormRef)">
    <template #header>
      <h4>添加站点</h4>
    </template>
    <template #default>
      <el-form ref="ownFormRef" :model="formLabelAlign">
        <el-form-item prop="site" :rules="[{ required: true, message: '请输入网站名称' }]">
          <el-input size="small" v-model="formLabelAlign.site" placeholder="网站名称" />
        </el-form-item>
        <el-form-item prop="url" :rules="[{ required: true, message: '请输入网站地址' }]">
          <el-input size="small" v-model="formLabelAlign.url" placeholder="网站地址" />
        </el-form-item>
        <el-form-item prop="introduction" :rules="[{ required: true, message: '请输入网站描述' }]">
          <el-input size="small" v-model="formLabelAlign.introduction" placeholder="网站描述" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button size="small" type="primary" @click="submitForm(ownFormRef)">添加</el-button>
        <el-button size="small" @click="resetForm(ownFormRef)">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped></style>
