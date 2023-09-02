import {createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions} from "vue-router"
import routes from "../routes";
import beforeGuard from "./beforeGuard";
import afterGuard from './afterGuard'
import {App} from "vue";
import {userStore} from "@/store";
import {initSDK} from "@/utils/wx-sdk";
// 创建路由
export const router = createRouter({
    history: createWebHashHistory(window.location.origin),
    routes: routes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({left: 0, top: 0}),
} as RouterOptions)
export default async (app: App) => {
    // await userStore.upgradeUserInfo()
    // await initSDK().catch((err:any) => console.error(err))
    app.use(router)
    beforeGuard(router)
    afterGuard(router)
}
