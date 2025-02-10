import { onMounted, onUnmounted, h, type Ref } from "vue";

export interface touchCardParams {
  showCover: Ref<boolean>;
  cardRef: Ref<HTMLDivElement | null>;
  coverRef: Ref<HTMLDivElement | null>;
  items: {
    type: "collection" | "delete";
    onClick: () => void;
  }[];
}

const mobilephone =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const collectionIcon =
  '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M192 736h640V128H256a64 64 0 0 0-64 64zm64-672h608a32 32 0 0 1 32 32v672a32 32 0 0 1-32 32H160l-32 57.536V192A128 128 0 0 1 256 64"></path><path fill="currentColor" d="M240 800a48 48 0 1 0 0 96h592v-96zm0-64h656v160a64 64 0 0 1-64 64H240a112 112 0 0 1 0-224m144-608v250.88l96-76.8 96 76.8V128zm-64-64h320v381.44a32 32 0 0 1-51.968 24.96L480 384l-108.032 86.4A32 32 0 0 1 320 445.44z"></path></svg>';

const deleteIcon =
  '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"></path></svg>';

export const useTouchCard = (params: touchCardParams) => {
  if (!mobilephone) {
    return;
  }

  const { showCover, cardRef, coverRef, items } = params;

  let touchListen = false;
  let beforeTouch = {
    clientX: 0,
    clientY: 0,
  };
  let moveCount = {
    x: 0,
    y: 0,
  };

  const setCoverStyle = () => {
    if (!cardRef.value) return;
    if (!coverRef.value) return;
    cardRef.value.style.position = "relative";
    cardRef.value.style.overflow = "hidden";
    coverRef.value.onclick = (e) => {
      e.stopPropagation();
    };

    for (const btn of items) {
      if (btn.type === "collection") {
        setBtn(collectionIcon, btn.onClick);
      }
      if (btn.type === "delete") {
        setBtn(deleteIcon, btn.onClick);
      }
    }

    cardRef.value.appendChild(coverRef.value);
  };

  const setBtn = (icon: string, onClick: () => void) => {
    if (!coverRef.value) return;
    const btn = document.createElement("div");
    btn.className = "flex-1 h-full flex justify-center items-center";
    btn.onclick = (e) => {
      e.stopPropagation();
      onClick();
    };
    const SVG = document.createElement("div");
    const iconClassName = "w-6 h-6";
    SVG.innerHTML = icon;
    SVG.className = iconClassName;
    btn.appendChild(SVG);
    coverRef.value.appendChild(btn);
  };

  const onTouchStart = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    touchListen = true;
    beforeTouch = {
      clientX: clientX,
      clientY: clientY,
    };
    moveCount = {
      x: 0,
      y: 0,
    };
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!touchListen) return;
    const { clientX, clientY } = e.touches[0];
    const touchMove = {
      x: beforeTouch.clientX - clientX,
      y: beforeTouch.clientY - clientY,
    };
    moveCount.x += touchMove.x;
    moveCount.y += touchMove.y;
    beforeTouch = {
      clientX,
      clientY,
    };
  };
  const onTouchEnd = (e: TouchEvent) => {
    touchListen = false;
    beforeTouch = {
      clientX: 0,
      clientY: 0,
    };
    if (moveCount.x > 60) {
      showCover.value = true;
    }
    if (moveCount.x < -60) {
      showCover.value = false;
    }
    moveCount = {
      x: 0,
      y: 0,
    };
  };

  onMounted(() => {
    setCoverStyle();
    cardRef.value?.addEventListener("touchstart", onTouchStart);
    cardRef.value?.addEventListener("touchmove", onTouchMove);
    cardRef.value?.addEventListener("touchend", onTouchEnd);
  });

  onUnmounted(() => {
    cardRef.value?.removeEventListener("touchstart", onTouchStart);
    cardRef.value?.removeEventListener("touchmove", onTouchMove);
    cardRef.value?.removeEventListener("touchend", onTouchEnd);
  });

  return;
};
