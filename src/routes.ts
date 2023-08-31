import { RouterRaw } from "@/router/@types";
import {LayoutEnum} from "@/layouts/types";
// 基础展示路由页面
export const rootRouters:Array<RouterRaw> = [
    {
        path:'/',
        name:'home',
        meta:{ title:'首页',layout: LayoutEnum.admin },
        component: () => import('@/pages/home/index.vue')
    },
    {
        path:'/login',
        name:'login',
        meta:{ title:'正在登陆...',layout: LayoutEnum.default },
        component: () => import('@/pages/root/login/index.vue')
    },
]
// 权限路由
export const dynamicRoutes :Array<RouterRaw> = [

]
export default rootRouters
