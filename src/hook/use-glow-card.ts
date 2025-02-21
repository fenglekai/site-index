/**
 * 卡牌发光悬浮
 * https://mp.weixin.qq.com/s/hZUX7PCDGQj6Ih8_dWzb1w
 */
import { onMounted, onUnmounted, ref } from "vue";
import { mobilephone } from "./use-mobile";

interface IOptions {
  light?: {
    width?: number; // 宽
    height?: number; // 高
    color?: string; // 颜色
    blur?: number; // filter: blur()
  };
}

export const useGlowCard = (option: IOptions = {}) => {
  // 获取卡片的dom节点
  const cardRef = ref<HTMLDivElement | null>(null);

  if (mobilephone) {
    //手机端不再设置光源，点击时无法消除光源    
    return { cardRef };
  }

  let cardOverflow = "";
  // 光的dom节点
  const lightRef = ref<HTMLDivElement>(document.createElement("div"));
  // 设置光源的样式

  const setLightStyle = () => {
    const {
      width = 60,
      height = 60,
      color = "#ff4132",
      blur = 40,
    } = option.light ?? {};
    const lightDom = lightRef.value;
    lightDom.style.position = "absolute";
    lightDom.style.width = `${width}px`;
    lightDom.style.height = `${height}px`;
    lightDom.style.background = color;
    lightDom.style.filter = `blur(${blur}px)`;
  };

  // 设置卡片的 overflow 为 hidden
  const setCardOverflowHidden = () => {
    const cardDom = cardRef.value;
    if (cardDom) {
      cardOverflow = cardDom.style.overflow;
      cardDom.style.overflow = "hidden";
    }
  };
  // 还原卡片的 overflow
  const restoreCardOverflow = () => {
    const cardDom = cardRef.value;
    if (cardDom) {
      cardDom.style.overflow = cardOverflow;
      cardDom.style.transform = "";
    }
  };

  // 往卡片添加光源
  const addLight = () => {
    const cardDom = cardRef.value;
    if (cardDom) {
      cardDom.appendChild(lightRef.value);
    }
  };
  // 删除光源
  const removeLight = () => {
    const cardDom = cardRef.value;
    if (cardDom) {
      cardDom.removeChild(lightRef.value);
    }
  };

  // 监听卡片的鼠标移入
  const onMouseEnter = () => {
    // 添加光源
    addLight();
    setCardOverflowHidden();
  };

  // 监听卡片的鼠标移动
  const onMouseMove = (e: MouseEvent) => {
    // 获取鼠标的坐标
    const { clientX, clientY } = e;
    // 让光跟随鼠标
    const cardDom = cardRef.value;
    const lightDom = lightRef.value;
    if (cardDom) {
      // 获取卡片相对于窗口的x和y坐标
      const { x, y } = cardDom.getBoundingClientRect();
      // 获取光的宽高
      const { width, height } = lightDom.getBoundingClientRect();
      lightDom.style.left = `${clientX - x - width / 2}px`;
      lightDom.style.top = `${clientY - y - height / 2}px`;

      cardDom.style.transform = `perspective(1000px)`; //设置 3D 透视
    }
  };
  // 监听卡片鼠标移出
  const onMouseLeave = () => {
    // 鼠标离开移出光源
    removeLight();
    restoreCardOverflow();
  };

  onMounted(() => {
    // 设置光源样式
    setLightStyle();
    // 绑定事件
    cardRef.value?.addEventListener("mouseenter", onMouseEnter);
    cardRef.value?.addEventListener("mousemove", onMouseMove);
    cardRef.value?.addEventListener("mouseleave", onMouseLeave);
  });

  onUnmounted(() => {
    // 解绑事件
    cardRef.value?.removeEventListener("mouseenter", onMouseEnter);
    cardRef.value?.removeEventListener("mousemove", onMouseMove);
    cardRef.value?.removeEventListener("mouseleave", onMouseLeave);
  });

  return {
    cardRef,
  };
};
