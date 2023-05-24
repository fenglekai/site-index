/// <reference types="vite/client" />
import { jarallax } from "jarallax";

declare module "jarallax" {
  interface jarallax {}
  export function jarallaxVideo(): void;
}
