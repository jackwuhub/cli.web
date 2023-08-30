import { RouterRaw } from "@/router/@types";
import {LayoutEnum} from "@/layouts/types";
// 基础展示路由页面
export const rootRouters:Array<RouterRaw> = [

    {
        path:'/login',
        name:'login',
        meta:{ title:'正在登陆...',layout: LayoutEnum.default },
        component: () => import('@/pages/root/login/index.vue')
    },
    // 错误页面
    {
        path: '/:path(.*)*',
        name: 'error',
        meta: { title: '页面不见了',layout: LayoutEnum.default },
        component: () => import('@/pages/root/error/404.vue'),
    },
]
// 权限路由
export const dynamicRoutes :Array<RouterRaw> = [
    // {
    //     path:'/super',
    //     name: 'super',
    //     meta: { title:'系统管理', layout: LayoutEnum.admin }
    // },
    {
        path: "/",
        name: "index",
        meta:{ title:'统计台',layout: LayoutEnum.admin,icon: 'home' },
        component: () => import('@/pages/home/index.vue')
    },
    {
        path:'/system',
        name: 'system',
        meta: { title: '系统管理'},
        redirect:'/system/user',
        children:[
            {
                path:'/system/user',
                name: 'systemUser',
                meta: { title:'用户管理', layout: LayoutEnum.admin,icon: 'user'},
                component: () => import('@/pages/system/user/index.vue')
            },
            {
                path:'/system/role',
                name: 'systemRole',
                meta: { title:'角色管理', layout: LayoutEnum.admin,icon: 'role' },
                component: () => import('@/pages/system/role/index.vue')
            },
            {
                path:'/system/department',
                name: 'systemDept',
                meta: { title:'部门管理', layout: LayoutEnum.admin,icon: 'dept' },
                component: () => import('@/pages/system/department/index.vue')
            },
        ]
    }
]
export default rootRouters
