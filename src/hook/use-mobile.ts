const testUserAgent =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const MOBILE_WIDTH = 640;

export const screenWidth = ref(document.body.clientWidth);
window.onresize = () => {
  return (() => {
    screenWidth.value = document.body.clientWidth;
  })();
};
export const mobileScreen = computed(() => {
  return screenWidth.value <= MOBILE_WIDTH;
});

export const mobilephone = testUserAgent || mobileScreen.value;
