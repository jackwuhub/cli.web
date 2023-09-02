import { RouterRaw } from "@/router/@types";
import {LayoutEnum} from "@/layouts/types";
// 基础展示路由页面
export const rootRouters:Array<RouterRaw> = [
    {
        path:'/',
        name:'home',
        meta: { title: '主页', layout: LayoutEnum.default },
        component: () => import('@/pages/home/index.vue')
    },
    // 错误页面
    {
        path: '/:path(.*)*',
        name: 'error',
        meta: { title: '页面不见了',layout: LayoutEnum.default },
        component: () => import('@/pages/error/404.vue'),
    },
]
// 权限路由
export const dynamicRoutes :Array<RouterRaw> = [

]
export default rootRouters
