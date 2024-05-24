<script lang="ts" setup>
import { inject, onMounted, reactive, ref, watch } from "vue";
import { navLink } from "../config/index";
import { ElMessage, FormInstance } from "element-plus";
import Giscus from "@giscus/vue";

onMounted(() => {
  getLocalList();
});

const darkBackground = inject("darkBackground");

const handleClick = (title: string, url: string) => {
  addHistoryRow(title, url);
  window.open(url);
};

/**
 * 我的链接&历史访问
 *
 */

// 历史访问
const historyList = ref<{ title: string; url: string }[]>([]);
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

const addHistoryRow = (title: string, url: string) => {
  let localHistory = getLocal();
  const currentLink = { title, url };
  localHistory.unshift(currentLink);
  // 只保留15条
  localHistory = localHistory.slice(0, 14);
  // 去重
  function uniqueFunc(arr: any, uniId: any) {
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
const ownList = ref<{ title: string; url: string }[]>([]);
const getSelfLocal = () => {
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
  title: "",
  url: "http://",
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      addOwnRow(formLabelAlign.title, formLabelAlign.url);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  showAddForm.value = false;
};

const addOwnRow = (title: string, url: string) => {
  let selfLocal = getSelfLocal();
  const currentLink = { title, url };
  selfLocal.unshift(currentLink);
  // 去重
  function uniqueFunc(arr: any, uniId: any) {
    const res = new Map();
    return arr.filter(
      (item: any) => !res.has(item[uniId]) && res.set(item[uniId], 1)
    );
  }
  selfLocal = uniqueFunc(selfLocal, "url");
  ownList.value = selfLocal;
  localStorage.setItem("own-list", JSON.stringify(selfLocal));
  showAddForm.value = false;
};
const deleteOwnRow = (row: any) => {
  const selfLocal = getSelfLocal();
  const filterList = selfLocal.filter((item: any) => {
    if (item.title == row.title && item.url == row.url) {
      return false;
    } else {
      return true;
    }
  });
  ownList.value = filterList;
  localStorage.setItem("own-list", JSON.stringify(filterList));
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
            const link = JSON.parse(this.result);
            if (!(link instanceof Array)) {
              throw Error("数据格式不是数组");
            }
            for (const key in link) {
              if (!link[key].title || !link[key].url) {
                throw Error("数据字段不存在title或者url");
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
  <div
    :class="[
      'grid grid-cols-1 xl:grid-cols-6 gap-4 mt-2',
      darkBackground ? 'text-white' : 'text-gray-600',
    ]"
  >
    <!-- 主要链接 -->
    <div class="col-span-5">
      <!-- nav container -->
      <template v-for="category in navLink">
        <div class="mb-6">
          <h2 :id="category.navTitle" class="mb-4 text-2xl">
            {{ category.navTitle }}
          </h2>
          <div
            class="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6"
          >
            <template v-for="item in category.children">
              <div
                class="p-4 bg-white border rounded-md shadow-md transition-all group overflow-hidden cursor-pointer hover:bg-orange-100"
                @click="handleClick(item.site, item.url)"
              >
                <h3
                  class="text-orange-500 font-bold text-md break-words group-hover:text-orange-600"
                >
                  {{ item.site }}
                </h3>
                <p
                  class="text-gray-400 text-sm break-words group-hover:text-orange-400"
                >
                  {{ item.introduction }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>

    <!-- 我的链接&历史访问 -->
    <div class="col-span-1 pl-8">
      <section class="mb-4 space-y-2">
        <div class="flex items-center space-x-2">
          <h3>我的链接</h3>
          <el-tooltip content="添加链接">
            <el-icon
              class="cursor-pointer transition-all hover:text-orange-500"
              @click="showAddForm = !showAddForm"
              ><IEpCirclePlusFilled
            /></el-icon>
          </el-tooltip>
          <el-tooltip content="保存到本地">
            <el-icon
              class="cursor-pointer transition-all hover:text-orange-500"
              @click="handleDownload"
            >
              <IEpDownload />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="导入链接">
            <el-icon
              class="cursor-pointer transition-all hover:text-orange-500"
              @click="handleUpload"
            >
              <IEpUpload />
            </el-icon>
          </el-tooltip>
        </div>
        <!-- add -->
        <el-form
          ref="ownFormRef"
          :model="formLabelAlign"
          :class="[
            'overflow-hidden transition-all',
            showAddForm ? 'max-h-32' : 'max-h-0',
          ]"
        >
          <el-form-item
            prop="title"
            :rules="[{ required: true, message: '请输入网站名称' }]"
          >
            <el-input
              size="small"
              v-model="formLabelAlign.title"
              placeholder="网站名称"
            />
          </el-form-item>
          <el-form-item
            prop="url"
            :rules="[{ required: true, message: '请输入网站地址' }]"
          >
            <el-input size="small" v-model="formLabelAlign.url" />
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="submitForm(ownFormRef)"
              >添加</el-button
            >
            <el-button size="small" @click="resetForm(ownFormRef)"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
        <ul class="list-none">
          <li v-for="item in ownList" class="flex justify-between items-center">
            <a
              @click="handleClick(item.title, item.url)"
              class="flex-grow cursor-pointer truncate"
              >{{ item.title }}</a
            >
            <el-icon
              class="cursor-pointer transition-all hover:text-orange-500"
              @click="deleteOwnRow(item)"
              ><IEpRemoveFilled
            /></el-icon>
          </li>
        </ul>
      </section>
      <section class="mb-4 space-y-2">
        <h3>历史访问</h3>
        <ul class="list-none">
          <li
            v-for="item in historyList"
            class="flex justify-between items-center"
          >
            <a
              @click="handleClick(item.title, item.url)"
              class="flex-grow cursor-pointer truncate"
              >{{ item.title }}</a
            >
            <el-icon
              class="cursor-pointer transition-all hover:text-orange-500"
              @click="deleteHistoryRow(item)"
              ><IEpRemoveFilled
            /></el-icon>
          </li>
        </ul>
        <p class="text-gray-400 text-sm">显示最近15条访问记录</p>
      </section>
      <section class="mb-4 space-y-2">
        <h3>评论</h3>
        <Giscus
          id="comments"
          repo="fenglekai/giscus"
          repoId="R_kgDOKS-Cjg"
          category="Announcements"
          categoryId="DIC_kwDOKS-Cjs4CZRcG"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="zh-CN"
          loading="lazy"
        />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
