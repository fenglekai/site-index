<script lang="ts" setup>
import {} from "vue";
const props = defineProps({
  content: {
    type: Object,
    default() {
      return {
        url: "url",
        LogoImg: "/src/assets/sgImg.png",
        title: "title",
        description: "description",
        detailImg: "/src/assets/previewSG.png",
      };
    },
  },
});
</script>

<template>
  <a
    class="card-wrapper w-full text-white sm:hover:text-yellow-400 focus:text-white"
    :href="props.content.url"
    target="_blank"
  >
    <figure
      class="w-full h-full p-8 border border-gray-500 rounded-md backdrop-filter backdrop-blur shadow-2xl cursor-pointer overflow-hidden"
    >
      <el-image
        style="width: 75px"
        :src="`${props.content.LogoImg}`"
        fit="contain"
      ></el-image>
      <p class="my-3 font-bold text-lg xl:text-2xl maxSize:text-5xl break-words">
        {{ props.content.title }}
      </p>
      <p class="break-words text-sm xl:text-xl maxSize:text-4xl">{{ props.content.description }}</p>
    </figure>
  </a>
  <img
    class="card-img hidden sm:block"
    :src="props.content.detailImg"
    alt="card-img"
  />
</template>

<style scoped>
.card-wrapper {
  position: relative;
  /* overflow: hidden; */
}

.card-wrapper::before {
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0;
  transition: 0.3s;
  border: 2px solid #fff;
  content: "";
  height: 60px;
  transform: scale3d(0, 0, 0) rotate(-45deg) translate3d(-50%, -50%, 0);
  transform-origin: top left;
  width: 60px;
  z-index: 2;
}
.card-wrapper::after {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  content: "\2794";
  display: inline-block;
  font: normal normal normal 14px/1 Material-Design-Iconic-Font;
  font-size: 2rem;
  text-rendering: auto;
  transform: translate3d(-50%, -50%, 0) scale(2);
  z-index: 3;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transition: 0.3s;
}

figure {
  max-width: 100%;
  position: relative;
  overflow: hidden;
}
figure::after {
  bottom: -2px;
  content: "";
  left: -2px;
  position: absolute;
  right: -2px;
  top: -2px;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  z-index: 4;
  transition: 0.3s;
}

.card-img {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: auto;
  visibility: hidden;
  z-index: 20;
  opacity: 0;
  transform: scale(0.9);
  transition: 0.3s;
}
@media (any-hover: hover) {
  .card-wrapper:hover:before {
    opacity: 1;
    transform: scale3d(1, 1, 1) rotate(-45deg) translate3d(-50%, -50%, 0);
  }
  .card-wrapper:hover:after {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1);
  }

  figure:hover:after {
    opacity: 1;
  }
  .card-wrapper:hover figure:after {
    opacity: 1;
  }

  .card-wrapper:hover {
    z-index: 21;
  }
  .card-wrapper:hover + .card-img {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
}
</style>
