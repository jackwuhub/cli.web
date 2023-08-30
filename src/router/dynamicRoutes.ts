import {RouteRaw2AsideMenu, RouterRaw} from './@types'
import {router} from './index'
import {dynamicRoutes} from '@/routes'
import {RouteRecordRaw} from "vue-router";
import {permissionStore, settingStore} from "@/store";
import {AsideMenuItem} from "@/layouts/components/AsideMenu/types";


/**
 * 获取根据name获取路由
 * @param name
 * @param routeList
 */
export const getRoute = ( name: string, routeList: Array<RouterRaw>): RouterRaw | undefined =>
    routeList?.find((routerRaw: RouterRaw) => routerRaw.name.toLowerCase() === name.toLowerCase())
/**
 * 转译router为侧边栏
 * @param routerRawList
 */
export const routerRawToAsideMenu:RouteRaw2AsideMenu = (routerRawList) => {
    const list:AsideMenuItem[] = []
    if(!routerRawList || routerRawList && !routerRawList.length) return list
    routerRawList?.forEach((routerRaw) => {
        const { path, children, meta } = routerRaw
        const { hidden } = meta ?? {  }
        !hidden && list.push({
            title: meta?.title ?? '未知',
            icon: meta?.icon ?? '',
            route: path,
            children: routerRawToAsideMenu(children ?? [])
        })
    })
    return list
}


/**
 * 深度遍历动态路由
 * 1、菜单根据path匹配name
 * 2、页面路径根据name匹配
 * @param apiRoute
 * @param rootRoute
 */
const deepTree = ( apiRoute: RouterRaw[], rootRoute: RouterRaw[] | undefined,):Array<RouterRaw> => {
    let list: Array<RouterRaw> = []
    if (!apiRoute || (apiRoute && !apiRoute.length) || !rootRoute || (rootRoute && !rootRoute.length)) return [] // 不存在则返回空
    apiRoute.forEach((item) => {
        const routeRaw = getRoute(<string>(item.name), rootRoute) // 获取实际路由
        !!routeRaw && list.push({
            ...routeRaw,
            meta:{
                ...routeRaw?.meta,
                title: item?.meta?.title ?? routeRaw?.meta?.title,
                icon: item?.meta?.icon ?? routeRaw?.meta?.icon,
            },
            children: deepTree(item.children ?? [], routeRaw.children)
        })
    })
    return list
}


/** 设置路由 */
export const setRoute = ():Promise<void> => {
    return new Promise((resolve) => {
        // let routerList: RouterRaw[] = deepTree(permissionStore.routes,dynamicRoutes)
        let routerList: RouterRaw[] = deepTree(dynamicRoutes,dynamicRoutes)
        routerList.forEach((ele:RouterRaw) => {
            !!ele && router.addRoute(ele as unknown as RouteRecordRaw)
        })
        settingStore.setMenuList(routerRawToAsideMenu([...routerList])) // 设置侧边栏
        resolve()
    })
}
