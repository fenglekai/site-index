<script setup>
import { onMounted, nextTick } from 'vue';

onMounted(async () => {
  await nextTick();

  // 为什么这里需要判断 window 是否存在？
  // twikoo 库在运行时尝试访问 navigator 对象
  // vitepress 会在 ssr 时运行 twikoo 代码，导致 navigator 未定义
  // 所以需要在浏览器环境下才加载 twikoo, 避免 ssr 时报错
  if (typeof window !== 'undefined') {
    const twikoo = await import('twikoo');
    twikoo.init({
      envId: 'https://twikoo.devkai.cn/',
      el: '#tcomment',
    });
  }
});
</script>

<template>
  <div id="tcomment"></div>
</template>