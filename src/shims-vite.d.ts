
declare module 'virtual:pwa-register' {
  export const registerSW: (options?: any) => void;
}

declare module "jarallax" {
  import { jarallax } from "jarallax";
  interface jarallax {}
  export function jarallaxVideo(): void;
}