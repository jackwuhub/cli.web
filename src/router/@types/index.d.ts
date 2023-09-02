import { defineComponent } from 'vue'
import {RouteMeta, RouteRecordRaw} from "vue-router";
import {LayoutEnum} from "@/layouts/types";
// 组件
export type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);
// 路由每一项
export interface RouterRaw extends Partial<RouteRecordRaw>{
    name: string
    path: string
    component?: Component | string
    components?: Component;
    meta?: RouteMeta & { layout?:LayoutEnum,icon?:string }
    children?: Array<RouterRaw>
    redirect?:string
}
