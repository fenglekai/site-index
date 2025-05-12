<script lang="ts" setup>
import {} from "vue";
import footerImg from "../../assets/footerImg.webp";

const registration = import.meta.env.VITE_FOOTER_REGISTRATION;
const publicSecurityRegistration = import.meta.env
  .VITE_FOOTER_PUBLIC_SECURITY_REGISTRATION;
</script>

<template>
  <div class="footer-wrapper text-xs">
    <div class="flex justify-center items-center space-x-2 w-full lg:w-auto">
      <a
        class="text-gray-500"
        href="https://github.com/fenglekai/site-index"
        target="_blank"
        aria-label="go to github page"
      >
        <svg
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
        >
          <path
            fill="currentcolor"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
      </a>
      <span>Fenglekai</span>
    </div>
    <a
      class="font-medium text-gray-500 transition-colors"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      ><span>{{ registration }}</span></a
    >
    <a
      class="flex justify-center items-center font-medium text-gray-500 transition-colors"
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
      />
      <span>{{ publicSecurityRegistration }}</span>
    </a>
  </div>
</template>

<style scoped>
.footer-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
