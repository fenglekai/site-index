<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AnimateBanner from "../bilibiliBanner/Index.vue";
import { Layout } from "../bilibiliBanner/types";
const layerList: Layout[] = [
  { key: 1, translateXPower: 0.01, disableTranslateX: true, translateYPower: -0.01 },
  { key: 2, translateXPower: 0 },
  { key: 3, translateXPower: 0.02 },
  { key: 4, translateXPower: 0.03 },
  { key: 5, translateXPower: 0.01 },
  { key: 6, translateXPower: 0.04 },
  { key: 7, translateXPower: 0.035, translateYPower: 0.003 },
  { key: 8, translateXPower: 0.04 },
  { key: 9, translateXPower: 0.05 },
  { key: 10, translateXPower: 0.06 },
  { key: 11, translateXPower: 0.02 },
  { key: 12, translateXPower: 0.08 },
  { key: 13, translateXPower: 0.08 },
  { key: 14, translateXPower: 0.04 },
  { key: 15, translateXPower: 0.06, translateYPower: 0.002 },
  { key: 16, translateXPower: 0.08, translateYPower: 0.002 },
  { key: 17, translateXPower: 0.08 },
  { key: 18, translateXPower: 0.13 },
  { key: 19, translateXPower: 0.08 },
  { key: 20, translateXPower: 0.1 },
  { key: 21, translateXPower: 0.05 },
  { key: 22, translateXPower: 0.13 },
  { key: 23, translateXPower: 0.1 },
];
const video1: any = ref(null);
onMounted(() => {
  video1.value.play();
});
</script>

<template>
  <AnimateBanner :layout="layerList">
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/17a1bcfacfc51f000cad0611dca32020b18db6f5.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/f0ba9b7f8d4ec1745a08cabdf3951ceb4aa266d1.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/be5632d3f86228a81979b8a85ce9cf0d5df541e0.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="260"
        width="2787"
        style="
          height: 260.594px;
          width: 2787.1px;
          transform: translate(348.387px, 27.871px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/f63cf9726b73c78ececc43ff16f3336fdfc76748.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="238"
        width="2554"
        style="
          height: 238.877px;
          width: 2554.84px;
          transform: translate(383.226px, 38.3226px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/2c32dd208cb8f317ac78e03c78da5cd04b9a1410.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/e04d0fbaaf67bdb0de7c40dca04180a9c1defa0a.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/d5113ee4aaca71d7e7570a45b1e541efc0deca71.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/ae0543610dd9b3d0903cec7a6982200691dce1b5.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/6d9f792b3458e0b6f8647f7ad3958b1c1438d50e.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/f3945f0ed928e45fb58c8a1edb07358ec719c8df.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/ba22577d90164e589f87f9073d56953ff3e30088.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/d6ef89533fed72dfde53009ac2aab66009ab545a.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(116.129px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/8cacfce7b1f44f707836fa4fb68444a9c7202d63.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/ff63f10698f5f0a9e9083d90c6f32de5269801d4.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 11.6129px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/5630bebd1068fa6c46eaea4ffa9b004f882d7d33.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/a7ead379e7a6653cd70f24e8556ce336702abb3a.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/06336184ba84f89890f50e867012c05914219947.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/ddc58cd92df71ada0be9bad00b2139a34872ef94.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(-116.129px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/996a5656d3a31738f79b67d94ea0b654fba169ac.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="195"
        width="2090"
        style="
          height: 195.445px;
          width: 2090.32px;
          transform: translate(-104.516px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/905fbc85df462f16c3fe0b83f0e5814696818a56.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/4d37acea06841ace858f27cab3a5596d9fdd8354.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <video
        ref="video1"
        loop
        muted
        src="/1b6e0c89-4e8e-4c1a-a062-e6dede411137.webm"
        playsinline
        width="209"
        height="116"
        style="
          object-fit: cover;
          height: 116.129px;
          width: 209.032px;
          transform: translate(-284.516px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
        data-height="100"
        data-width="180"
      ></video>
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/d4d4569741806055f36c4d9140bdd7069a50ec09.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="238"
        width="2554"
        style="
          height: 238.877px;
          width: 2554.84px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
    <div class="layer">
      <img
        src="/src/assets/banner/20240527/2dd4a5f8aee1829bcdae687052853b8947a5d2f6.png@1c.webp"
        data-height="187"
        data-width="2000"
        height="217"
        width="2322"
        style="
          height: 217.161px;
          width: 2322.58px;
          transform: translate(0px, 17.4194px) rotate(0deg) scale(1);
          opacity: 1;
        "
      />
    </div>
  </AnimateBanner>
</template>

<style scoped></style>
