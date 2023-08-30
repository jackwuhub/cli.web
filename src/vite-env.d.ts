/// <reference types="vite/client" />

declare module "*.vue" {
  import type {DefineComponent, Directive} from "vue";
  import Vue from 'vue';
  const component: DefineComponent<{}, {}, any>;
  const directive: Directive
  export default {component,Vue,directive};
}
declare module globalThis {
  interface Window {
    wx:{
      agentConfig: Function
      invoke:Function
      ready:Function
    }
  }
}
