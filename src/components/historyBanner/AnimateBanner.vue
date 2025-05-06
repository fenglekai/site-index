<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AnimateBanner from "../bilibiliBanner/Index.vue";
const layerList = [
  { key: 1, translateXPower: 0.005 },
  { key: 2, translateXPower: 0.005 },
  { key: 3, rotatePower: 0.05 },
  { key: 4, translateXPower: 0.005 },
  { key: 5, translateXPower: 0.04 },
  { key: 6, translateXPower: 0.04 },
  { key: 7, translateXPower: 0.04 },
  { key: 8, translateXPower: 0.04 },
  { key: 9, translateXPower: 0.04 },
  { key: 10, translateXPower: 0.04 },
  { key: 11, translateXPower: 0.05 },
  { key: 12, translateXPower: 0.05 },
  { key: 13, translateXPower: 0.06 },
  { key: 14, translateXPower: 0.07 },
  { key: 15, translateXPower: 0.1 },
  { key: 16, translateXPower: 0.06 },
  { key: 17, translateXPower: 0.1 },
  { key: 18, translateXPower: 0.1 },
  { key: 19, translateXPower: 0.1 },
  { key: 20, translateXPower: 0.08 },
];
const video1: any = ref(null);
const video2: any = ref(null);
onMounted(() => {
  video1.value.play();
  video2.value.play();
});
</script>

<template>
  <AnimateBanner :layout="layerList">
    <div class="layer">
      <img src="/src/assets/banner/default/84d497a6dfd615b19a043ff698e1c2ec7778e5e0.png@1c.webp" data-height="141"
        data-width="1500" height="240" width="2554" style="
          height: 240.155px;
          width: 2554.84px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/f9b6799c3c961d2d84a90766c57f1dc77c4ed810.png@1c.webp" data-height="247"
        data-width="999" height="286" width="1160" style="
          height: 286.839px;
          width: 1160.13px;
          transform: translate(-232.258px, -23.2258px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <!-- video -->
    <div class="layer">
      <video ref="video1" loop muted playsinline src="/9092cdcb-20d6-49a0-9e2b-27faaac022c9.webm" width="232"
        height="240" style="
          object-fit: cover;
          height: 240.387px;
          width: 232.258px;
          transform: translate(209.032px, -87.0968px) rotate(0deg) scale(1);
          filter: blur(0.5px);
          opacity: 1;
        " data-height="207" data-width="200"></video>
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/959e712ac2d218c9db749721aa29058eacbdd314.png@1c.webp" data-height="308"
        data-width="298" height="286" width="276" style="
          height: 286.142px;
          width: 276.852px;
          transform: translate(-371.613px, -139.355px) rotate(0deg) scale(1);
          filter: blur(1px);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/d769fffe86c057cbff0e633079a047f1c2934013.png@1c.webp" data-height="241"
        data-width="1998" height="242" width="2010" style="
          height: 242.555px;
          width: 2010.89px;
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/4b60843c6b101b27a38d2ab50e0437d823569add.png@1c.webp" data-height="264"
        data-width="1004" height="286" width="1088" style="
          height: 286.142px;
          width: 1088.21px;
          transform: translate(0px, -32.5161px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/bf6fe9544f6fe613df296225d200a31db1b285dd.png@1c.webp" data-height="284"
        data-width="399" height="307" width="432" style="
          height: 307.819px;
          width: 432.465px;
          transform: translate(-650.323px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/80e5bc372faa9b38ba794a2bf371c45486fe7130.png@1c.webp" data-height="104"
        data-width="1505" height="96" width="1398" style="
          height: 96.6194px;
          width: 1398.19px;
          transform: translate(92.9032px, 97.5484px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/be626199daaaa4799925217f0b91bd8ff7cd71a4.png@1c.webp" data-height="84"
        data-width="100" height="117" width="139" style="
          height: 117.058px;
          width: 139.355px;
          transform: translate(-209.032px, 41.8065px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/671e3861e049d01e274f4828974726bcb9c036ef.png@1c.webp" data-height="143"
        data-width="200" height="177" width="247" style="
          height: 177.135px;
          width: 247.742px;
          transform: translate(-470.71px, 30.9677px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/bc954b9250303d69f601b534424be6dc54c58ce8.png@1c.webp" data-height="97"
        data-width="100" height="112" width="116" style="
          height: 112.645px;
          width: 116.129px;
          transform: translate(104.516px, 29.0323px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/94228d32fd6379eda248b31518b26f80fbf38809.png@1c.webp" data-height="102"
        data-width="200" height="126" width="247" style="
          height: 126.348px;
          width: 247.742px;
          transform: translate(123.871px, 49.5484px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <!-- video -->
    <div class="layer">
      <video ref="video2" loop muted playsinline src="/f8fe4512-3396-4a9a-99f9-433f9a1ff4a9.webm" width="619"
        height="312" style="
          object-fit: cover;
          height: 312.155px;
          width: 619.355px;
          transform: translate(-24.7742px, 12.3871px) rotate(0deg) scale(1);
          opacity: 1;
        " data-height="252" data-width="500"></video>
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/3c26423644a88603952bf7c68df6c904fe6ab709.png@1c.webp" data-height="92"
        data-width="200" height="128" width="278" style="
          height: 128.206px;
          width: 278.71px;
          transform: translate(0px, 83.6129px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/4d0b65e71e810a8d4c221f6856854505ed69a674.png@1c.webp" data-height="201"
        data-width="300" height="155" width="232" style="
          height: 155.613px;
          width: 232.258px;
          transform: translate(-309.677px, 46.4516px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/d2b652c22d4f34c56f666770c7c6f512afaceb4a.png@1c.webp" data-height="135"
        data-width="300" height="146" width="325" style="
          height: 146.323px;
          width: 325.161px;
          transform: translate(433.548px, 65.0323px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/c96f03a28e64ed99ce771826109bbbc8aecc1ef8.png@1c.webp" data-height="267"
        data-width="400" height="227" width="340" style="
          height: 227.381px;
          width: 340.645px;
          transform: translate(-766.452px, 25.5484px) rotate(0deg) scale(1);
          filter: blur(0.3px);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/6bea5126260c524aac992b24e079b18c38b8f213.png@1c.webp" data-height="180"
        data-width="99" height="278" width="153" style="
          height: 278.71px;
          width: 153.29px;
          transform: translate(-541.935px, 0px) rotate(0deg) scale(1);
          filter: blur(0.3px);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/cfb34b346ebd8887cc6c1c12440d8c6a491338c7.png@1c.webp" data-height="199"
        data-width="598" height="246" width="740" style="
          height: 246.503px;
          width: 740.748px;
          transform: translate(-1238.71px, 0px) rotate(0deg) scale(1);
          filter: blur(0.8px);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/5d3faa724d37deac240d72db0d2815a49627dca2.png@1c.webp" data-height="262"
        data-width="498" height="283" width="539" style="
          height: 283.974px;
          width: 539.768px;
          transform: translate(1246.45px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>
    <div class="layer">
      <img src="/src/assets/banner/default/9053f6601e309fe373b91f5b1d54e1e19536b3b8.png@1c.webp" data-height="151"
        data-width="800" height="280" width="1486" style="
          height: 280.568px;
          width: 1486.45px;
          transform: translate(557.419px, 0px) rotate(0deg) scale(1);
          opacity: 1;
        " />
    </div>

    <template v-slot:content>
      <slot></slot>
    </template>
  </AnimateBanner>
</template>

<style scoped></style>
