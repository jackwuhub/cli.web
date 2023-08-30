import {createRouter, createWebHistory, RouteRecordRaw, RouterOptions} from "vue-router"
import routes from "../routes";
import beforeGuard from "./beforeGuard";
import afterGuard from './afterGuard'
import {App} from "vue";
import {permissionStore, userStore} from "@/store";
import {setRoute} from "@/router/dynamicRoutes";
// 创建路由
export const router = createRouter({
    history: createWebHistory(),
    routes: routes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({left: 0, top: 0}),
} as RouterOptions)
export default async (app: App) => {
    // await userStore.upgradeUserInfo() // 注册用户信息
    // await permissionStore.upgradePermissionInfo() // 注册权限信息
    await setRoute() // 注册权限路由
    // beforeGuard(router)
    afterGuard(router)
    app.use(router)

}
