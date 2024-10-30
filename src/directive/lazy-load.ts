import { Directive } from 'vue';

/**
 * 图片懒加载监听data-src属性
 */
const tagName = 'data-src'
const LazyLoad: Directive = {
  mounted(el: HTMLImageElement, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const src = el.getAttribute(tagName);
          if (src) {
            el.src = src;
          } else {
            console.warn(`${tagName} is not found.`)
          }
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
  }
};

export default LazyLoad;