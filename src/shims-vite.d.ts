declare module "virtual:pwa-register" {
  export const registerSW: (options?: any) => void;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}