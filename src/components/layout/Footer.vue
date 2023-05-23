<script lang="ts" setup>
import {} from "vue";
import footerImg from "../../assets/footerImg.webp";
</script>

<template>
  <div class="footer-wrapper text-xs space-x-4">
    <p>Power for Fenglekai</p>
    <p class="space-x-4 text-gray-500">
      <a
        class="font-medium text-gray-500 transition-colors hover:text-blue-500"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
        >桂ICP备2023001286号-1</a
      ><a
        class="font-medium text-gray-500 transition-colors hover:text-blue-500"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702005344"
        target="_blank"
        rel="noopener noreferrer"
        ><img
          alt="footerImg"
          :src="footerImg"
          width="17"
          height="17"
          decoding="async"
          data-nimg="1"
          class="inline-block mr-2"
          loading="lazy"
          style="color: transparent"
        />粤公网安备 44030702005344号</a
      >
    </p>
  </div>
</template>

<style scoped>
.footer-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
