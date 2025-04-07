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
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" /></svg>';

const deleteIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /></svg>';

const closeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" /></svg>';

export const useTouchCard = (params: touchCardParams) => {
  const { showCover, cardRef, coverRef, items } = params;

  let timeOutEvent: NodeJS.Timeout | null;

  const setShowCover = (value: boolean) => {
    showCover.value = value;
  };

  if (!mobilephone) {
    return {setShowCover};
  }

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

    setBtn(closeIcon, () => setShowCover(false));
    cardRef.value.appendChild(coverRef.value);
  };

  const setBtn = (icon: string, onClick: () => void) => {
    if (!coverRef.value) return;
    const btn = document.createElement("div");
    btn.className = "kai-text flex-1 h-full flex justify-center items-center";
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
    e.stopPropagation();
    timeOutEvent = setTimeout(() => {
      setShowCover(true);
    }, 500);
  };
  const onTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    if (timeOutEvent) {
      clearTimeout(timeOutEvent);
      timeOutEvent = null;
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    e.stopPropagation();
    if (timeOutEvent) {
      clearTimeout(timeOutEvent);
      timeOutEvent = null;
    }
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

  return {
    setShowCover: setShowCover
  };
};
