import { App } from 'vue';
import lazyLoad from './lazy-load';

export default {
  install(Vue: App) {
    Vue.directive('lazy', lazyLoad);
  },
};
