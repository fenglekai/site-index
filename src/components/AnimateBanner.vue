<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const video1: any = ref(null);
const video2: any = ref(null);
const bannerWrapper: any = ref(null);
const animated: any = ref(null);
const startX = ref(0);
const useStart = ref(false);

const nodeTransformList = computed(() => {
  const result: any = [];
  for (let i = 0; i < animated.value.children.length; i++) {
    result.push(animated.value.children[i].children[0].style.transform);
  }
  return result;
});

const getTranslateXY = (item: any) => {
  return item
    .replace(/[^0-9\-.,]/g, "")
    .slice(0, -2)
    .split(",")
    .map((item: string) => {
      return Number(item);
    });
};

const transformLabel = (key: number, translateX: number) => {
  const splitTransform = getTranslateXY(nodeTransformList.value[key]);
  return `translate(${splitTransform[0] + translateX}px , ${
    splitTransform[1]
  }px) rotate(0deg) scale(1)`;
};

const animatedTranslate = (node: any, key: number) => {
  const defaultXY = getTranslateXY(nodeTransformList.value[key]);
  const currentXY = getTranslateXY(node.style.transform);
  let initX = defaultXY[0];
  let curX = currentXY[0];
  const LR = initX - curX > 0 ? true : false;
  let speed = 1;

  const timer = setInterval(() => {
    const distance = Math.abs(initX - getTranslateXY(node.style.transform)[0]);
    let toEnd = 0;

    if (distance > 10) {
      speed += 6;
      if (LR) {
        toEnd = curX + speed;
      } else {
        toEnd = curX - speed;
      }
      node.style.transform = transformResetLabel(key, toEnd);
    } else {
      node.style.transform = transformResetLabel(key, initX);
      clearInterval(timer);
    }
  }, 1);
};

const rotateTransition = (node: any, key: number) => {
  const defaultRotate = Number(
    nodeTransformList.value[key]
      .replace(/[^0-9\-)]/g, "")
      .slice(0, -1)
      .split(")")
      .slice(1, 2)[0]
  );
  const currentRotate = Number(
    node.style.transform
      .replace(/[^0-9\-.)]/g, "")
      .slice(0, -1)
      .split(")")
      .slice(1, 2)[0]
  );
  const splitTransform = getTranslateXY(nodeTransformList.value[key]);

  const LR = defaultRotate - currentRotate > 0 ? true : false;
  let speed = 1;

  const timer = setInterval(() => {
    const distance = Math.abs(
      defaultRotate -
        Number(
          node.style.transform
            .replace(/[^0-9\-.)]/g, "")
            .slice(0, -1)
            .split(")")
            .slice(1, 2)[0]
        )
    );
    let toEnd = 0;

    if (distance > 10) {
      speed += 1;
      if (LR) {
        toEnd = currentRotate + speed;
      } else {
        toEnd = currentRotate - speed;
      }
      node.style.transform = `translate(${splitTransform[0]}px , ${splitTransform[1]}px) rotate(${toEnd}deg) scale(1)`;
    } else {
      node.style.transform = `translate(${splitTransform[0]}px , ${splitTransform[1]}px) rotate(0deg) scale(1)`;
      clearInterval(timer);
    }
  }, 1);
};

const transformResetLabel = (key: number, translateX: number) => {
  const splitTransform = getTranslateXY(nodeTransformList.value[key]);
  return `translate(${translateX}px , ${splitTransform[1]}px) rotate(0deg) scale(1)`;
};

const useMousemove = (e: any) => {
  // length:21
  const node_0 = animated.value.children[0].children[0];
  const node_1 = animated.value.children[1].children[0];
  const node_2 = animated.value.children[2].children[0];
  const node_3 = animated.value.children[3].children[0];
  const node_4 = animated.value.children[4].children[0];
  const node_5 = animated.value.children[5].children[0];
  const node_6 = animated.value.children[6].children[0];
  const node_7 = animated.value.children[7].children[0];
  const node_8 = animated.value.children[8].children[0];
  const node_9 = animated.value.children[9].children[0];
  const node_10 = animated.value.children[10].children[0];
  const node_11 = animated.value.children[11].children[0];
  const node_12 = animated.value.children[12].children[0];
  const node_13 = animated.value.children[13].children[0];
  const node_14 = animated.value.children[14].children[0];
  const node_15 = animated.value.children[15].children[0];
  const node_16 = animated.value.children[16].children[0];
  const node_17 = animated.value.children[17].children[0];
  const node_18 = animated.value.children[18].children[0];
  const node_19 = animated.value.children[19].children[0];
  const node_20 = animated.value.children[20].children[0];

  if (e.y < bannerWrapper.value.clientHeight) {
    if (!useStart.value) {
      startX.value = e.offsetX;
      useStart.value = true;
    }

    const translateXNum = -(startX.value - e.x);

    node_1.style.transform = transformLabel(1, translateXNum * 0.005);
    node_2.style.transform = transformLabel(2, translateXNum * 0.005);
    const splitTransform = getTranslateXY(nodeTransformList.value[3]);
    node_3.style.transform = `translate(${splitTransform[0]}px , ${
      splitTransform[1]
    }px) rotate(${-translateXNum * 0.05}deg) scale(1)`;
    node_4.style.transform = transformLabel(4, translateXNum * 0.005);
    node_5.style.transform = transformLabel(5, translateXNum * 0.01);
    node_6.style.transform = transformLabel(6, translateXNum * 0.04);
    node_7.style.transform = transformLabel(7, translateXNum * 0.04);
    node_8.style.transform = transformLabel(8, translateXNum * 0.04);
    node_9.style.transform = transformLabel(9, translateXNum * 0.04);
    node_10.style.transform = transformLabel(10, translateXNum * 0.04);
    node_11.style.transform = transformLabel(11, translateXNum * 0.05);
    node_12.style.transform = transformLabel(12, translateXNum * 0.05);
    node_13.style.transform = transformLabel(13, translateXNum * 0.06);
    node_14.style.transform = transformLabel(14, translateXNum * 0.07);
    node_15.style.transform = transformLabel(15, translateXNum * 0.1);
    node_16.style.transform = transformLabel(16, translateXNum * 0.06);
    node_17.style.transform = transformLabel(17, translateXNum * 0.1);
    node_18.style.transform = transformLabel(18, translateXNum * 0.1);
    node_19.style.transform = transformLabel(19, translateXNum * 0.1);
    node_20.style.transform = transformLabel(20, translateXNum * 0.08);
  } else {
    useStart.value = false;

    animatedTranslate(node_1, 1);
    animatedTranslate(node_2, 2);
    rotateTransition(node_3, 3);
    animatedTranslate(node_4, 4);
    animatedTranslate(node_5, 5);
    animatedTranslate(node_6, 6);
    animatedTranslate(node_7, 7);
    animatedTranslate(node_8, 8);
    animatedTranslate(node_9, 9);
    animatedTranslate(node_10, 10);
    animatedTranslate(node_11, 11);
    animatedTranslate(node_12, 12);
    animatedTranslate(node_13, 13);
    animatedTranslate(node_14, 14);
    animatedTranslate(node_15, 15);
    animatedTranslate(node_16, 16);
    animatedTranslate(node_17, 17);
    animatedTranslate(node_18, 18);
    animatedTranslate(node_19, 19);
    animatedTranslate(node_20, 20);
  }
};

const useMouseleave = (e: any) => {
  // length:21
  const node_0 = animated.value.children[0].children[0];
  const node_1 = animated.value.children[1].children[0];
  const node_2 = animated.value.children[2].children[0];
  const node_3 = animated.value.children[3].children[0];
  const node_4 = animated.value.children[4].children[0];
  const node_5 = animated.value.children[5].children[0];
  const node_6 = animated.value.children[6].children[0];
  const node_7 = animated.value.children[7].children[0];
  const node_8 = animated.value.children[8].children[0];
  const node_9 = animated.value.children[9].children[0];
  const node_10 = animated.value.children[10].children[0];
  const node_11 = animated.value.children[11].children[0];
  const node_12 = animated.value.children[12].children[0];
  const node_13 = animated.value.children[13].children[0];
  const node_14 = animated.value.children[14].children[0];
  const node_15 = animated.value.children[15].children[0];
  const node_16 = animated.value.children[16].children[0];
  const node_17 = animated.value.children[17].children[0];
  const node_18 = animated.value.children[18].children[0];
  const node_19 = animated.value.children[19].children[0];
  const node_20 = animated.value.children[20].children[0];
  useStart.value = false;
  animatedTranslate(node_1, 1);
  animatedTranslate(node_2, 2);
  rotateTransition(node_3, 3);
  animatedTranslate(node_4, 4);
  animatedTranslate(node_5, 5);
  animatedTranslate(node_6, 6);
  animatedTranslate(node_7, 7);
  animatedTranslate(node_8, 8);
  animatedTranslate(node_9, 9);
  animatedTranslate(node_10, 10);
  animatedTranslate(node_11, 11);
  animatedTranslate(node_12, 12);
  animatedTranslate(node_13, 13);
  animatedTranslate(node_14, 14);
  animatedTranslate(node_15, 15);
  animatedTranslate(node_16, 16);
  animatedTranslate(node_17, 17);
  animatedTranslate(node_18, 18);
  animatedTranslate(node_19, 19);
  animatedTranslate(node_20, 20);
};

const animatedBanner = () => {
  document.body.addEventListener("mousemove", useMousemove);
  document.body.addEventListener("mouseleave", useMouseleave);
};

onMounted(() => {
  video1.value.play();
  video2.value.play();

  animatedBanner();
});
onUnmounted(() => {
  document.body.removeEventListener("mousemove", useMousemove);
  document.body.removeEventListener("mousemove", useMouseleave);
});
</script>

<template>
  <div class="bili-header">
    <div class="bili-header__banner">
      <div ref="animated" class="animated-banner">
        <div class="layer">
          <img
            src="/src/assets/banner/84d497a6dfd615b19a043ff698e1c2ec7778e5e0.png@1c.webp"
            data-height="141"
            data-width="1500"
            height="240"
            width="2554"
            style="
              height: 240.155px;
              width: 2554.84px;
              transform: translate(0px, 0px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/f9b6799c3c961d2d84a90766c57f1dc77c4ed810.png@1c.webp"
            data-height="247"
            data-width="999"
            height="286"
            width="1160"
            style="
              height: 286.839px;
              width: 1160.13px;
              transform: translate(-232.258px, -23.2258px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <!-- video -->
        <div class="layer">
          <video
            ref="video1"
            loop
            muted
            playsinline
            src="/9092cdcb-20d6-49a0-9e2b-27faaac022c9.webm"
            width="232"
            height="240"
            style="
              object-fit: cover;
              height: 240.387px;
              width: 232.258px;
              transform: translate(209.032px, -87.0968px) rotate(0deg) scale(1);
              filter: blur(0.5px);
              opacity: 1;
            "
            data-height="207"
            data-width="200"
          ></video>
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/959e712ac2d218c9db749721aa29058eacbdd314.png@1c.webp"
            data-height="308"
            data-width="298"
            height="286"
            width="276"
            style="
              height: 286.142px;
              width: 276.852px;
              transform: translate(-371.613px, -139.355px) rotate(0deg) scale(1);
              filter: blur(1px);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/d769fffe86c057cbff0e633079a047f1c2934013.png@1c.webp"
            data-height="241"
            data-width="1998"
            height="242"
            width="2010"
            style="
              height: 242.555px;
              width: 2010.89px;
              transform: translate(0px, 0px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/4b60843c6b101b27a38d2ab50e0437d823569add.png@1c.webp"
            data-height="264"
            data-width="1004"
            height="286"
            width="1088"
            style="
              height: 286.142px;
              width: 1088.21px;
              transform: translate(0px, -32.5161px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/bf6fe9544f6fe613df296225d200a31db1b285dd.png@1c.webp"
            data-height="284"
            data-width="399"
            height="307"
            width="432"
            style="
              height: 307.819px;
              width: 432.465px;
              transform: translate(-650.323px, 0px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/80e5bc372faa9b38ba794a2bf371c45486fe7130.png@1c.webp"
            data-height="104"
            data-width="1505"
            height="96"
            width="1398"
            style="
              height: 96.6194px;
              width: 1398.19px;
              transform: translate(92.9032px, 97.5484px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/be626199daaaa4799925217f0b91bd8ff7cd71a4.png@1c.webp"
            data-height="84"
            data-width="100"
            height="117"
            width="139"
            style="
              height: 117.058px;
              width: 139.355px;
              transform: translate(-209.032px, 41.8065px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/671e3861e049d01e274f4828974726bcb9c036ef.png@1c.webp"
            data-height="143"
            data-width="200"
            height="177"
            width="247"
            style="
              height: 177.135px;
              width: 247.742px;
              transform: translate(-470.71px, 30.9677px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/bc954b9250303d69f601b534424be6dc54c58ce8.png@1c.webp"
            data-height="97"
            data-width="100"
            height="112"
            width="116"
            style="
              height: 112.645px;
              width: 116.129px;
              transform: translate(104.516px, 29.0323px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/94228d32fd6379eda248b31518b26f80fbf38809.png@1c.webp"
            data-height="102"
            data-width="200"
            height="126"
            width="247"
            style="
              height: 126.348px;
              width: 247.742px;
              transform: translate(123.871px, 49.5484px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <!-- video -->
        <div class="layer">
          <video
            ref="video2"
            loop
            muted
            playsinline
            src="/f8fe4512-3396-4a9a-99f9-433f9a1ff4a9.webm"
            width="619"
            height="312"
            style="
              object-fit: cover;
              height: 312.155px;
              width: 619.355px;
              transform: translate(-24.7742px, 12.3871px) rotate(0deg) scale(1);
              opacity: 1;
            "
            data-height="252"
            data-width="500"
          ></video>
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/3c26423644a88603952bf7c68df6c904fe6ab709.png@1c.webp"
            data-height="92"
            data-width="200"
            height="128"
            width="278"
            style="
              height: 128.206px;
              width: 278.71px;
              transform: translate(0px, 83.6129px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/4d0b65e71e810a8d4c221f6856854505ed69a674.png@1c.webp"
            data-height="201"
            data-width="300"
            height="155"
            width="232"
            style="
              height: 155.613px;
              width: 232.258px;
              transform: translate(-309.677px, 46.4516px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/d2b652c22d4f34c56f666770c7c6f512afaceb4a.png@1c.webp"
            data-height="135"
            data-width="300"
            height="146"
            width="325"
            style="
              height: 146.323px;
              width: 325.161px;
              transform: translate(433.548px, 65.0323px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/c96f03a28e64ed99ce771826109bbbc8aecc1ef8.png@1c.webp"
            data-height="267"
            data-width="400"
            height="227"
            width="340"
            style="
              height: 227.381px;
              width: 340.645px;
              transform: translate(-766.452px, 25.5484px) rotate(0deg) scale(1);
              filter: blur(0.3px);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/6bea5126260c524aac992b24e079b18c38b8f213.png@1c.webp"
            data-height="180"
            data-width="99"
            height="278"
            width="153"
            style="
              height: 278.71px;
              width: 153.29px;
              transform: translate(-541.935px, 0px) rotate(0deg) scale(1);
              filter: blur(0.3px);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/cfb34b346ebd8887cc6c1c12440d8c6a491338c7.png@1c.webp"
            data-height="199"
            data-width="598"
            height="246"
            width="740"
            style="
              height: 246.503px;
              width: 740.748px;
              transform: translate(-1238.71px, 0px) rotate(0deg) scale(1);
              filter: blur(0.8px);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/5d3faa724d37deac240d72db0d2815a49627dca2.png@1c.webp"
            data-height="262"
            data-width="498"
            height="283"
            width="539"
            style="
              height: 283.974px;
              width: 539.768px;
              transform: translate(1246.45px, 0px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
        <div class="layer">
          <img
            src="/src/assets/banner/9053f6601e309fe373b91f5b1d54e1e19536b3b8.png@1c.webp"
            data-height="151"
            data-width="800"
            height="280"
            width="1486"
            style="
              height: 280.568px;
              width: 1486.45px;
              transform: translate(557.419px, 0px) rotate(0deg) scale(1);
              opacity: 1;
            "
          />
        </div>
      </div>
      <div ref="bannerWrapper" class="relative w-full h-full"></div>
    </div>
  </div>
</template>

<style scoped>
.bili-header .bili-header__banner {
  position: relative;
  z-index: 0;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  min-width: 1000px;
  min-height: 155px;
  height: 180px;
  max-height: 240px;
  background-color: #e3e5e7;
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
}
.bili-header .animated-banner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.bili-header .animated-banner > .layer {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
