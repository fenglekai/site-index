<script lang="ts" setup>
import Footer from "../components/layout/Footer.vue";
import ProjectCard from "../components/ProjectCard.vue";
import topImg from "../assets/topImg.png";
import nextCloud from "../assets/nextCloud.png";
import indexImg from "../assets/indexImg.jpg";
import { projectContain } from "../config/index";
import { Ref, onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { jarallax, jarallaxVideo } from "jarallax";

const router = useRouter();
const jarallaxRef = ref(null);

onMounted(() => {
  // Optional video extension
  jarallaxVideo();
  let url = "mp4:/bgVideo.mp4";
  jarallax(jarallaxRef.value, {
    speed: 0.2,
    videoSrc: url,
  });
});

const handleNavClick = (key: string = "home") => {
  let doc: Document | any = document;
  doc.querySelector(`#${key}`).scrollIntoView({ behavior: "smooth" });
};

const baseView = ref(true);
const home: Ref<any> = ref(null);
function scrollHandle({ scrollLeft, scrollTop }: any) {
  // console.log(top);

  if (scrollTop > 60) {
    baseView.value = false;
    home.value.style.zIndex = 0;
  } else {
    baseView.value = true;
    home.value.style.zIndex = 30;
  }
}

const isMore = ref(false);
const handleMoreClick = (e: Element | any) => {
  e.stopPropagation();
  isMore.value = !isMore.value;
};
const handleCloseMoreClick = () => {
  if (isMore.value) {
    isMore.value = false;
  }
};
</script>

<template>
  <div class="relative" @click="handleCloseMoreClick">
    <img :src="indexImg" alt="bg" class="h-full w-full fixed" />

    <el-container class="w-full absolute top-0">
      <el-scrollbar
        height="100vh"
        wrap-class="home-wrap"
        @scroll="scrollHandle"
      >
        <div class="relative">
          <!-- nav -->
          <div
            :class="[
              'w-full sm:w-11/12 fixed sm:left-1/2 sm:transform sm:-translate-x-1/2 backdrop-filter backdrop-blur-xl sm:rounded-lg shadow-2xl transition-all duration-500',
              !baseView ? 'top-0 sm:top-2 z-20' : '-top-1/4',
            ]"
          >
            <div class="flex justify-between">
              <h1
                class="logo pl-4 lg:pl-20 text-sm maxSize:text-9xl lg:text-4xl"
                @click="handleNavClick('home')"
              >
                IAI Dept.
              </h1>
              <div class="flex lg:hidden items-center text-white text-4xl">
                <el-icon
                  :class="[
                    'mx-4 transition-all duration-300',
                    isMore ? 'rotate-90' : '',
                  ]"
                  @click="handleMoreClick"
                  ><IEpMoreFilled
                /></el-icon>
              </div>
              <div class="hidden lg:flex">
                <a
                  class="menu-text text-sm maxSize:text-7xl xl:text-2xl"
                  @click="handleNavClick('home')"
                  >Home</a
                >
                <a
                  class="menu-text text-sm maxSize:text-7xl xl:text-2xl"
                  @click="handleNavClick('about')"
                  >About</a
                >
                <a
                  class="menu-text text-sm maxSize:text-7xl xl:text-2xl"
                  @click="handleNavClick('services')"
                  >Services</a
                >
                <a
                  class="menu-text text-sm maxSize:text-7xl xl:text-2xl"
                  @click="
                    router.push('/nav');
                  "
                  >Navigation</a
                >
              </div>
            </div>
          </div>
          <!-- mobile nav -->
          <div
            :class="[
              'fixed lg:hidden top-0 w-full pt-16 backdrop-filter backdrop-blur-xl z-10 text-white transition-all duration-300',
              isMore ? 'opacity-100 visible' : 'opacity-0 invisible',
            ]"
          >
            <a class="menu-text justify-center" @click="handleNavClick('home')"
              ><span class="py-4">Home</span></a
            >
            <a
              class="menu-text justify-center py-4"
              @click="handleNavClick('about')"
              ><span class="py-4">About</span></a
            >
            <a
              class="menu-text justify-center"
              @click="handleNavClick('services')"
              ><span class="py-4">Services</span></a
            >
            <a
              class="menu-text justify-center"
              @click="
                router.push('/nav');
              "
              ><span class="py-4">Navigation</span>
            </a>
          </div>
          <!-- baseView -->
          <div ref="jarallaxRef" class="w-full overflow-hidden jarallax">
            <div class="bg-overlay"></div>
            <div
              ref="home"
              id="home"
              :class="[
                'relative flex justify-center maxSize:justify-around h-screen space-x-10 xl:space-x-60 pt-28 maxSize:pt-56 pb-48 maxSize:pb-72 transition-all duration-500 transform-gpu origin-top',
                baseView ? 'scale-110 max-h-screen' : 'scale-100 max-h-auto',
              ]"
            >
              <div
                class="text-white main-text flex flex-col justify-center maxSize:space-y-20 text-center lg:text-left"
              >
                <h1
                  class="text-gradient text-2xl maxSize:text-9xl cursor-default lg:text-6xl my-4 font-bold animate-[slide-down-fade_0.8s_ease-in-out]"
                >
                  IAI创新应用部
                </h1>
                <p
                  class="text-gradient text-xl maxSize:text-9xl cursor-default lg:text-5xl my-4 animate-[slide-down-fade_1.2s_ease-in-out]"
                >
                  跟随集团数字化转型
                </p>
                <p
                  class="text-gradient text-xl maxSize:text-9xl cursor-default lg:text-5xl my-4 animate-[slide-down-fade_1.6s_ease-in-out]"
                >
                  数据采集应用开发团队
                </p>
                <p
                  class="text-lg lg:text-4xl maxSize:text-8xl my-4 text-yellow-400 animate-[slide-down-fade_2s_ease-in-out]"
                >
                  " 独善其身 ➠ 赋能使能 "
                </p>
                <p
                  class="mt-16 my-4 text-lg lg:text-2xl maxSize:text-6xl animate-[slide-down-fade_2.4s_ease-in-out]"
                >
                  <span class="text-gradient cursor-default">
                    / 工业互联网</span
                  >
                  <span class="text-gradient cursor-default"> / 大数据</span>
                </p>
                <p
                  class="my-4 text-lg lg:text-2xl maxSize:text-6xl hidden md:block animate-[slide-down-fade_2.8s_ease-in-out]"
                >
                  <span class="text-gradient cursor-default"> / 人工智慧</span>
                  <span class="text-gradient cursor-default"> / AI时代</span>
                  <span class="text-gradient cursor-default"> / 智能制造</span>
                  <span class="text-gradient cursor-default"> / 智能决策</span>
                </p>
                <p class="my-4 text-lg lg:text-2xl maxSize:text-6xl md:hidden animate-[slide-down-fade_3.2s_ease-in-out]" >
                  <span class="text-gradient cursor-default"> / 智能制造</span>
                  <span class="text-gradient cursor-default"> / 智能决策</span>
                </p>
                <p class="my-4 text-lg lg:text-2xl maxSize:text-6xl md:hidden animate-[slide-down-fade_3.6s_ease-in-out]">
                  <span class="text-gradient cursor-default"> / 人工智慧</span>
                  <span class="text-gradient cursor-default"> / AI时代</span>
                </p>
              </div>
              <div
                class="hidden lg:flex items-center animate-[slide-down-fade_0.8s_ease-in-out]"
              >
                <el-image style="width: 24vw" :src="topImg" fit="contain" />
              </div>
            </div>
            <div
              v-show="baseView"
              class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-md lg:text-2xl maxSize:text-6xl flex items-center animate-pulse"
            >
              <el-icon><IEpBottom /></el-icon>
              <span> 下滑查看更多 </span>
            </div>
          </div>
          <!-- About -->
          <div
            id="about"
            style="z-index: 0"
            :class="[
              'w-5/6 backdrop-filter backdrop-blur-lg text-center m-auto p-4 lg:p-40 shadow-2xl text-white -my-32 rounded-2xl border border-gray-500',
              baseView
                ? 'invisible'
                : 'visible animate-[slide-down-fade_0.8s_ease-in-out]',
            ]"
          >
            <h2 class="card-title text-md xl:text-4xl maxSize:text-8xl">
              关于 IAI 创新应用部
            </h2>
            <el-image
              style="width: 24vw"
              class="my-14"
              :src="nextCloud"
              fit="contain"
            />
            <p class="my-2 text-sm xl:text-xl maxSize:text-4xl">
              IAI 创新应用部，是一个数据分析应用团队，以智能决策为目标。
            </p>
            <p class="my-2 text-sm xl:text-xl maxSize:text-4xl">
              依托六流数据基础，加入决策关键数据，开发各式各样的工业应用算法核心，核心业务包括数据采集、现场数据间控、机台数据分析、系统建置部署等。
            </p>
            <p class="my-2 text-sm xl:text-xl maxSize:text-4xl">
              成员横跨各大科系，包括电机、机械、统计、资工、工业工程等，能多面向的提出问题解决方案，借此达到集团推动转型所制定之『提质』、『增效』、『降本』、『减存』目标。
            </p>
          </div>
          <!-- Services -->
          <div
            id="services"
            class="pt-48 pb-4 xl:pb-24 px-4 md:px-24 xl:px-32 maxSize:space-y-14 text-white text-center bg-gradient"
          >
            <h2 class="card-title text-md xl:text-4xl maxSize:text-8xl my-4">
              专案服务介绍 / 链接
            </h2>
            <p class="my-2 text-sm xl:text-xl maxSize:text-4xl">
              透过边缘计算硬体的建置，实时、高效的运算，
            </p>
            <p class="my-2 text-sm xl:text-xl maxSize:text-4xl">
              结合IoT网路，实现算法模型快速、远端部署，IAI数字化转型推行专案
            </p>
            <div
              class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 maxSize:grid-cols-6 gap-4 justify-items-center px-0 xl:px-44 maxSize:px-96 my-16"
            >
              <ProjectCard v-for="item in projectContain" :content="item" />
            </div>
          </div>
        </div>
      </el-scrollbar>
      <el-backtop target=".home-wrap" :right="50" :bottom="50"/>
    </el-container>
  </div>
</template>

<style scoped>
.bg-gradient {
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.text-gradient {
  position: relative;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  background: #fff -webkit-linear-gradient(
      to right bottom,
      #f6ae2d 0%,
      #fff 100%
    ) no-repeat 0 0; /* Chrome 10-25, Safari 5.1-6 */
  background: #fff linear-gradient(to right bottom, #f6ae2d 0%, #fff 100%)
    no-repeat 0 0; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 0% auto;
}
.text-gradient:hover {
  background-size: 100% auto;
}

.header-wrapper {
  position: relative;
}
.logo {
  display: inline-block;
  margin: 1rem 0;
  font-family: "Days One", "Arial Black", "Copperplate", sans-serif;
  color: white;
  cursor: pointer;
  text-shadow: 2px 3px 5px grey;
  transition: 0.3s;
}
.logo:hover {
  color: #37ecba;
}
.main-text {
  font-family: "Days One", "Arial Black", "Copperplate", sans-serif;
}
.menu-text {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-weight: 400;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
}
.menu-text:hover {
  color: gold;
  background-color: rgba(48, 49, 51, 0.5);
}
.card-title {
  letter-spacing: 0.1rem;
  font-family: "Days One", "Noto Sans TC", "微软雅黑", "Helvetica",
    "Arial Black", "Copperplate", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.bg-overlay {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  filter: brightness(100%) contrast(100%) saturate(100%) blur(0px)
    hue-rotate(0deg);
  background-color: #191e4b;
  opacity: 0.2;
  transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
}
</style>
