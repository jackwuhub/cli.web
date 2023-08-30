import { defineComponent } from 'vue'
import {NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw, RouteMeta, RouteRecordRaw} from "vue-router";
import {AsideMenuItem} from "@/layouts/components/AsideMenu/types";
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
    meta?: RouteMeta & {
        layout?:LayoutEnum
        icon?:string
        hidden?:boolean
        title?:string
        layoutOptions?:{[key:any]: any}
    }
    children?: Array<RouterRaw>
    redirect?:string
    type?:RouteType
}
// vue-router配置转译侧边栏
export type RouteRaw2AsideMenu = (routerRawList:RouterRaw[]) => AsideMenuItem[]

export type Guard = (to:RouteLocationNormalized,from:RouteLocationNormalized) => RouteLocationRaw